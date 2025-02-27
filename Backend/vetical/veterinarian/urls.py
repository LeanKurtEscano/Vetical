from django.urls import path
from . import views
urlpatterns = [ 
    path('specializations/', views.get_specializations, name='specializations'),
    path('register/vet/', views.register_vet, name='register-vet'),
    path('register/clinic/', views.register_clinic, name='register-clinic'),
    path('vet/clinics/', views.get_veterinarian_clinics, name = 'veterinarian-clinics'),
    path('clinic/images/', views.get_clinics_images, name = 'veterinarian-clinics'),
    path("clinic/<int:clinic_id>/", views.clinic_detail, name="clinic_detail"),
    path("clinic/<int:clinic_id>/upload/", views.upload_new_image, name="clinic_detail"),
]
