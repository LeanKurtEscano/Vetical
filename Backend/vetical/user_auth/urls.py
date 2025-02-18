from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', views.user_login, name="user_login"),
    path('verify/', views.verify_password_otp, name="verify_login"), 
    path('register/',views.user_register, name="register"),
    path('register/verify/',views.verify_register_otp, name="verify_otp"),
    path('google-auth/', views.google_login, name="google_login "),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'), 
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  
    path('logout/', views.log_out, name='token_refresh'),  
]
