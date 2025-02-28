from rest_framework import serializers

from .models import Clinics, ClinicImages


        
class ClinicImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicImages
        fields = '__all__'

class ClinicSerializer(serializers.ModelSerializer):
    images = ClinicImagesSerializer(many=True, read_only=True)  

    class Meta:
        model = Clinics
        fields = ["id", "clinic_name", "email", "country", "city", "street_address", "zip_code", "images"]
        
