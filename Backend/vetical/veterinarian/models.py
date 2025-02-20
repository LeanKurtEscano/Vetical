from django.db import models
from user_auth.models import CustomUser

class Veterinarian(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="veterinarian")
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    clinic_address = models.TextField()
    years_of_experience = models.PositiveIntegerField(null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    license_number = models.CharField(max_length=50, unique=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
   

class Specializations(models.Model):
    specialization = models.CharField(max_length=255)

    
class VeterinarianSpecialization(models.Model):
    veterinarian = models.ForeignKey(Veterinarian, on_delete=models.CASCADE, related_name="specializations")
    specialization = models.ForeignKey(Specializations, on_delete = models.CASCADE)

