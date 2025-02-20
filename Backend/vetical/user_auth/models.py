from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_veterinarian = models.BooleanField(default=False)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    birthdate = models.DateField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)


