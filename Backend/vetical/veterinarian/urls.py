from django.urls import path
from . import views
urlpatterns = [ 
    path('specializations/', views.get_specializations, name='specializations'),
    path('register/vet/', views.register_vet, name='register-vet'),
    path('register/clinic/', views.register_clinic, name='register-clinic'),
    
]
