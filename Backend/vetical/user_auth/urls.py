from django.urls import path
from . import views


urlpatterns = [
    path('login/', views.user_login, name="user_login"),
    path('verify/', views.verify_password_otp, name="verify_login"),
    path('google-auth/', views.google_login, name="google_login "),
]
