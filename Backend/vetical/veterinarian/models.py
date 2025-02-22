from django.db import models
from user_auth.models import CustomUser

class Veterinarian(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name="veterinarian")
    first_name = models.CharField(max_length=255, null = True)
    last_name = models.CharField(max_length=255, null = True)
    middle_name = models.CharField(max_length=255, null = True)
    phone_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    clinic_address = models.TextField()
    years_of_experience = models.PositiveIntegerField(null=True, blank=True)
    education = models.TextField(null=True, blank=True)
    license_number = models.CharField(max_length=50, unique=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    registered_at = models.TimeField(auto_now_add = True,null=True, blank=True)
   

class Specializations(models.Model):
    specialization = models.CharField(max_length=255)

    
class VeterinarianSpecialization(models.Model):
    veterinarian = models.ForeignKey(Veterinarian, on_delete=models.CASCADE, related_name="specializations")
    specialization = models.ForeignKey(Specializations, on_delete = models.CASCADE)

class Clinics(models.Model):
    clinic_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    opening_hours = models.CharField( max_length =255, null=True, blank=True)
    close_hours = models.CharField( max_length = 255, null=True, blank=True)
    latitude = models.DecimalField(max_digits = 9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits = 9, decimal_places=6, null=True, blank=True)
    country = models.CharField(max_length = 100, null=True, blank=True)
    unit = models.CharField(max_length = 50, null=True, blank=True)
    building = models.CharField(max_length = 100, null=True, blank=True)
    street_address = models.CharField(max_length = 255, null=True, blank=True)
    barangay = models.CharField(max_length = 100 , null=True, blank=True)
    city = models.CharField(max_length = 100, null=True, blank=True)
    zip_code = models.CharField(max_length = 10, null=True, blank=True)
    province = models.CharField(max_length = 100, null=True, blank=True)

    def __str__(self):
        return self.clinic_name 

class ClinicImages(models.Model):
    clinic = models.ForeignKey(Clinics, on_delete=models.CASCADE)
    image_url = models.URLField(null=True, blank=True) 
    
class Services(models.Model):
    service = models.CharField(max_length=100)
    
class ClinicServices(models.Model):
    clinic = models.ForeignKey(Clinics, on_delete=models.CASCADE)
    service = models.ForeignKey(Services, on_delete=models.CASCADE)