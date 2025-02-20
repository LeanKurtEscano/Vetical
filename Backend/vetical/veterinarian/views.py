
from rest_framework import status
from rest_framework.response import Response
from .serializers import SpecializationSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Specializations, VeterinarianSpecialization, Veterinarian
from user_auth.models import CustomUser
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
        
   
    