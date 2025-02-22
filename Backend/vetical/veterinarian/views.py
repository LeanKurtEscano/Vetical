
from rest_framework import status
from rest_framework.response import Response
from .serializers import SpecializationSerializer
from rest_framework.decorators import api_view,permission_classes,parser_classes
from rest_framework.permissions import IsAuthenticated
from .models import Specializations, VeterinarianSpecialization, Veterinarian
from rest_framework.parsers import MultiPartParser, FormParser
from user_auth.models import CustomUser
import cloudinary.uploader
from .models import Clinics, ClinicImage, ClinicServices

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_specializations(request):
    
    specializations =  Specializations.objects.all()
    
    serializer = SpecializationSerializer(specializations, many = True)
    return Response(serializer.data, status= status.HTTP_200_OK)
    


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_vet(request):
    try:
        data = request.data.get("data")
        
        if Veterinarian.objects.filter(email = data['email']).exists():
            return Response({"error": "Account is already registered as veterinarian"}, status= status.HTTP_403_FORBIDDEN)
        
        user = CustomUser.objects.get(id = int(data['id']))
        user.is_veterinarian = True
        user.save()
        vet = Veterinarian.objects.create(
            user_id = int(data['id']),
            email = data['email'],
            first_name = data['first_name'],
            middle_name = data['middle_name'],
            last_name = data['last_name'],
            phone_number = data['phone_number'],
            clinic_address = data['clinic_address'],
            years_of_experience = data['years_of_experience'],
            education = data['education'],
            license_number = data['license_number'],
            latitude = data['latitude'],
            longitude = data['longitude'],
                                        )
     
        vet_specializations = [int(spec['id']) for spec in data['specializations']]
        
        for spec_id in vet_specializations:
            specializations = Specializations.objects.get(id = spec_id)
            vet_specializations = VeterinarianSpecialization.objects.create(specialization_id = specializations.id, veterinarian_id = vet.id)
        return Response({"success": "Veterinarian registered successfully"}, status= status.HTTP_200_OK)
        
    except Exception as e:
        print(f"{e}")
        return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
   

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_vet(request):
    try:
      data = request.data.get("data")
      print(data)
      
      return Response({"success": "ADASDADA"},status=status.HTTP_200_OK)
        
    except Exception as e:
        print(f"{e}")
        return Response({"error": "Something went wrong"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
@permission_classes([IsAuthenticated])
def register_clinic(request):
    try:
        # Extract images
        images = request.FILES.getlist('images')

        # Extract other fields safely
        clinic_name = request.data.get('clinicName', '').strip()
        email = request.data.get('email', '').strip()
        opening_hours = request.data.get('openingHours', '').strip()
        close_hours = request.data.get('closeHours', '').strip()
        latitude = float(request.data.get('latitude', 0))
        longitude = float(request.data.get('longitude', 0))
        country = request.data.get('country', '').strip()
        unit = request.data.get('unit', '').strip()
        building = request.data.get('building', '').strip()
        street_address = request.data.get('streetAddress', '').strip()
        barangay = request.data.get('barangay', '').strip()
        city = request.data.get('city', '').strip()
        zip_code = request.data.get('zipCode', '').strip()
        province = request.data.get('province', '').strip()
        selected_services = request.data.get('selectedServices', '')

      
        selected_services_list = [int(x) for x in selected_services.split(",") if x.strip().isdigit()]

      
        clinic = Clinics.objects.create(
            clinic_name=clinic_name,
            email=email,
            opening_hours=opening_hours,
            close_hours=close_hours,
            latitude=latitude,
            longitude=longitude,
            country=country,
            unit=unit,
            building=building,
            street_address=street_address,
            barangay=barangay,
            city=city,
            zip_code=zip_code,
            province=province,
        )

     
        for image in images:
            uploaded_image = cloudinary.uploader.upload(image)
            ClinicImage.objects.create(clinic=clinic, image=uploaded_image['secure_url'])

        for service_id in selected_services_list:
            ClinicServices.objects.create(clinic=clinic, service_id=service_id)

        return Response({"success": "Clinic registered successfully"}, status=200)

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": "Something went wrong"}, status=400)


@api_view(["GET"])
def get_clinics(request):
    clinics = Clinics.objects.all()
    data = []

    for clinic in clinics:
        images = ClinicImage.objects.filter(clinic=clinic)
        image_urls = [image.image.url for image in images]  # Automatically get Cloudinary URLs

        data.append({
            "clinicName": clinic.clinic_name,
            "email": clinic.email,
            "images": image_urls,  # Cloudinary will return URLs
        })

    return Response(data)
