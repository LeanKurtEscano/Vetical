
from rest_framework import status
from rest_framework.response import Response
from .serializers import SpecializationSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Specializations

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_specializations(request):
    
    specializations =  Specializations.objects.all()
    
    serializer = SpecializationSerializer(specializations, many = True)
    return Response(serializer.data, status= status.HTTP_200_OK)
    


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def register_vet(request):
    data = request.data.get("data")
    
    print(data)
    return Response({"success": ""}, status= status.HTTP_200_OK)
    