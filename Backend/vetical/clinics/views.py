from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from .models import  Veterinarian
from rest_framework.parsers import MultiPartParser, FormParser
import cloudinary.uploader
from veterinarian.models import Clinics, ClinicImages, ClinicServices
from .serializers import ClinicSerializer,ClinicImagesSerializer
from django.utils.timezone import localtime


@api_view(["GET"])
def display_clinic_listings(request):
    clinics = Clinics.objects.all()
    data = []

    for clinic in clinics:
        images = ClinicImages.objects.filter(clinic=clinic)
        image_urls = [image.image.url for image in images]  

        data.append({
            "clinicName": clinic.clinic_name,
            "email": clinic.email,
            "images": image_urls, 
        })

    return Response(data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_veterinarian_clinics(request):
    try:
      
        if not hasattr(request.user, "veterinarian"):
            return Response({"error": "User is not registered as a veterinarian"}, status=403)

        veterinarian = request.user.veterinarian  

        clinics = Clinics.objects.filter(veterinarian=veterinarian)

        serializer = ClinicSerializer(clinics, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    except Exception as e:
        return Response({"error": str(e)}, status=500)




@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_clinics_images(request):
    try:
        vet = Veterinarian.objects.get(user=request.user)
        clinics = Clinics.objects.filter(veterinarian=vet.id) 

        if not clinics.exists():
            return Response({"error": "No clinics found"}, status=404)

        clinic_array = []

        for clinic in clinics:
            clinic_images = ClinicImages.objects.filter(clinic=clinic.id)
            image_urls = [str(image.image) for image in clinic_images]

            serializer = ClinicSerializer(clinic)
            clinic_data = serializer.data
            clinic_data["location"] = f"{clinic.city}, {clinic.province}"
            clinic_data["formatted_date"] = localtime(clinic.registered_at).strftime("%B %d, %Y")
            clinic_data["images"] = image_urls  

            clinic_array.append(clinic_data) 
        return Response(clinic_array, status=200)

 
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=500)



@api_view(["GET", "DELETE"])
@permission_classes([IsAuthenticated])
def clinic_detail(request, clinic_id):
    try:
        clinic = Clinics.objects.get(id=int(clinic_id))
    except Clinics.DoesNotExist:
        return Response({"error": "Clinic not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        serializer = ClinicSerializer(clinic)
        print(serializer.data)
      
        return Response(serializer.data, status=status.HTTP_200_OK)

    elif request.method == "DELETE":
        clinic.delete()
        return Response({"message": "Clinic deleted successfully"}, status=status.HTTP_204_NO_CONTENT)




@api_view(["POST"])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def upload_new_image(request, clinic_id):
    try:
      
        clinic = Clinics.objects.get(id=clinic_id, veterinarian__user=request.user)

       
        if "image" not in request.FILES:
            return Response({"error": "No image provided"}, status=400)

        image = request.FILES["image"]

        uploaded_image = cloudinary.uploader.upload(image)
        ClinicImages.objects.create(clinic=clinic, image=uploaded_image['secure_url'])

        return Response({"message": "Image uploaded successfully"}, status=201)

    except Clinics.DoesNotExist:
        return Response({"error": "Clinic not found"}, status=404)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=500)
