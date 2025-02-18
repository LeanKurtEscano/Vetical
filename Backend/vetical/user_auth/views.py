from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import CustomUser
from rest_framework.response import Response
from django.contrib.auth import authenticate,logout
from .oauth.google import google_auth
from rest_framework_simplejwt.tokens import RefreshToken
import os
from rest_framework import status
import logging
from django.core.cache import cache
from .emails.email import send_otp_to_email
from django.contrib.auth.hashers import make_password

logger = logging.getLogger(__name__)
# Create your views here.

@api_view(["POST"])
def user_login(request):
    try:
        data = request.data.get("data", {})  
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return Response({"error": "Please fill out all fields"}, status=status.HTTP_400_BAD_REQUEST)

        user = CustomUser.objects.filter(email=email).first()

        if not user:
            return Response({"error": "Email is not registered"}, status=status.HTTP_404_NOT_FOUND)

      
        user_auth = authenticate(request, username=user.username, password=password)
        if not user_auth:
            return Response({"error": "Incorrect Password"}, status=status.HTTP_401_UNAUTHORIZED)

        
        purpose = "verification"
        message = "Your OTP for verification"
        subject = f"Your  Verification Code for Login"
        cache_key = f"{email}_{purpose}"
        otp_generated = send_otp_to_email(email, message,subject)

        OTP_EXPIRATION_TIME = 120  
        cache.set(cache_key, otp_generated, OTP_EXPIRATION_TIME)

        return Response({"success": "Verified Credentials"}, status=status.HTTP_200_OK)

    except Exception as e:
        print(f"Login Error: {e}")  
        return Response({"error": "Something went wrong. Please try again."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



@api_view(["POST"])
def verify_password_otp(request):
    try:
        # Extract data from request
        data = request.data.get("data", {})
        email = data.get("email")
        password = data.get("password")
        otpCode = data.get("otpCode")
        purpose = "verification"
        
       
        cache_key = f"{email}_{purpose}"
        
        # Get OTP from cache
        cache_otp = cache.get(cache_key)
       
        if cache_otp is None:
            return Response({"error": "OTP code is expired. Please generate a new one"}, status=status.HTTP_404_NOT_FOUND)
        
        
        if str(cache_otp) == str(otpCode):
            
            user_auth = authenticate(request, username=email, password=password)
            
           
            get_token = RefreshToken.for_user(user_auth)
            return Response({
                "success": "User is verified",
                "refresh": str(get_token),
                "access": str(get_token.access_token)
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Incorrect OTP code. Please try again."}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        print(f"{e}")
        # Catch any other unexpected errors
        return Response({"error": "An unexpected error occurred. Please try again later."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["POST"])    
def verify_register_otp(request):
    data = request.data.get("data", {})
    email = data.get("email")
    otpCode = data.get("otpCode")
    user_data = request.data.get("details", {})
  
    
    purpose = "register"
    
    cache_key = f"{email}_{purpose}"

    
    cache_otp = cache.get(cache_key)
    
    if cache_otp is None:
        return Response({"error":"OTP code is expired. Please generate a new one"},status=status.HTTP_404_NOT_FOUND)
    
    if str(cache_otp) == str(otpCode):
        email = user_data.get("email")
        password = user_data.get("password")
        birthdate = user_data.get("birthdate")
        age = user_data.get("age")
        longitude = user_data.get("longitude")
        latitude = user_data.get("latitude")
        
        user = CustomUser.objects.create(email= email, password = make_password(password), birthdate=birthdate, age = int(age), longitude = float(longitude), latitude = float(latitude))
        return Response({"success": "User is verified"},status = status.HTTP_200_OK)
    
    return Response({"error": "Incorrect OTP code. Please try again."},status = status.HTTP_400_BAD_REQUEST)

    
    
    
@api_view(["POST"])
def user_register(request):
    try:
        data = request.data.get("data", {})
        email = data.get("email")
        
        if CustomUser.objects.filter(email = email).exists():
            return Response({"error": "email is already in use"}, status=status.HTTP_403_FORBIDDEN)
        
        purpose = "register"
        message = "Your OTP for Account Registration"
        subject = f"Your Account Verification Code for Account Registration"
        
        
        cache_key = f"{email}_{purpose}"
        
        
    
        otp_generated = send_otp_to_email(email, message,subject)
        
        OTP_EXPIRATION_TIME = 120  
        cache.set(cache_key, otp_generated, OTP_EXPIRATION_TIME)
        
        return Response({"success": "user pass data validation"}, status=status.HTTP_200_OK)
    
    
    
    except Exception as e:
        print(f"{e}")
    
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def log_out(request):
    try:
        refresh_token = request.data.get("refresh")  
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist() 
        logout(request)
        return Response({'success': 'Logged out successfully'}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def google_login(request):
    try:
        code = request.data.get("code")
        
        if not code:
            return Response({"error": "Authorization code is required"}, status= status.HTTP_400_BAD_REQUEST)
        
        CLIENT_ID = os.getenv("CLIENT_ID")
        CLIENT_SECRET = os.getenv("CLIENT_SECRET")
        
        email, username = google_auth(code,CLIENT_ID,CLIENT_SECRET)
        
        if email and username:
            user, created = CustomUser.objects.get_or_create(email=email, defaults={'username':username})
            get_token = RefreshToken.for_user(user)
            access_token = str(get_token.access_token)
            refresh_token = str(get_token)
        else:
            return Response({"error": "Failed to sign in using google"},status= status.HTTP_400_BAD_REQUEST)
        
       
        return Response({"success": "User has successfully login with google",
                         "access_token": access_token,
                         "refresh_token": refresh_token}, status= status.HTTP_200_OK)
    except Exception as e:
        print(f"{e}")
        return Response({"error": "Network Error"}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)