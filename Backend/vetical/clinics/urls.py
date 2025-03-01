from django.urls import path
from . import views
urlpatterns = [
    path('vet/clinics/', views.get_veterinarian_clinics, name = 'veterinarian-clinics'),
    path('clinic/images/', views.get_clinics_images, name = 'veterinarian-clinics'),
    path("clinic/<int:clinic_id>/", views.clinic_detail, name="clinic_detail"),
    path("clinic/<int:clinic_id>/upload/", views.upload_new_image, name="clinic_detail"),
    path("clinic/image/<int:id>/", views.delete_clinic_images, name="delete_image"),
]
