from django.contrib.auth.models import AbstractUser
from django.db import models

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
   
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.username


class Veterinarian(models.Model):
    user_id = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="veterinarian")
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

    def __str__(self):
        return f"{self.veterinarian.user.username} - {self.specialization}"
    
class VeterinarianSpecialization(models.Model):
    veterinarian_id = models.ForeignKey(Veterinarian, on_delete=models.CASCADE, related_name="specializations")
    specialization_id = models.ForeignKey(Specializations, on_delete = models.CASCADE)

