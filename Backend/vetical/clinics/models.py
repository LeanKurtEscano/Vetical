from django.db import models
from veterinarian.models import Veterinarian
from django.utils.timezone import now  
import cloudinary
import cloudinary.uploader
import cloudinary.models


class Clinics(models.Model):
    veterinarian = models.ForeignKey(Veterinarian, on_delete=models.CASCADE, null=True, blank=True)
    clinic_name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(unique=True, null=True, blank=True)
    opening_hours = models.CharField( max_length =255, null=True, blank=True)
    close_hours = models.CharField( max_length = 255, null=True, blank=True)
    latitude = models.FloatField( null=True, blank=True)
    longitude = models.FloatField( null=True, blank=True)
    country = models.CharField(max_length = 100, null=True, blank=True)
    unit = models.CharField(max_length = 50, null=True, blank=True)
    building = models.CharField(max_length = 100, null=True, blank=True)
    street_address = models.CharField(max_length = 255, null=True, blank=True)
    barangay = models.CharField(max_length = 100 , null=True, blank=True)
    city = models.CharField(max_length = 100, null=True, blank=True)
    zip_code = models.CharField(max_length = 10, null=True, blank=True)
    province = models.CharField(max_length = 100, null=True, blank=True)
    registered_at = models.DateTimeField(default=now) 
    

    def __str__(self):
        return self.clinic_name 

class ClinicImages(models.Model):
    clinic = models.ForeignKey(Clinics, on_delete=models.CASCADE, related_name="images")
    image = cloudinary.models.CloudinaryField("image") 
    uploaded_at = models.DateTimeField(auto_now_add=True)
    
class Services(models.Model):
    service = models.CharField(max_length=100)
    
class ClinicServices(models.Model):
    clinic = models.ForeignKey(Clinics, on_delete=models.CASCADE)
    service = models.ForeignKey(Services, on_delete=models.CASCADE)