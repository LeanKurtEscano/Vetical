from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'birthdate', 'age', 'longitude', 'latitude','is_veterinarian']
        
        

