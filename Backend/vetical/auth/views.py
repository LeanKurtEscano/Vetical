from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth import authenticate,logout
from .oauth.google import google_auth
from rest_framework_simplejwt.tokens import RefreshToken
import os
from rest_framework import status
import logging

logger = logging.getLogger(__name__)
# Create your views here.

@api_view(["POST"])
def user_login(request):
    try:
        email = request.data.get("email")
        password = request.data.get("password")
        
        if not email or not password:
            return Response({"invalid":"Please fill out all fields"},  status= status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.filter(email = email).first()
        
        if not user:
            return Response({"email": "Email is not registered"}, status= status.HTTP_404_NOT_FOUND)
        
        username = user.username
        
        user_auth = authenticate(request, username=username, password=password)
        
        if not user_auth:
            return Response({"password": "Incorrect Password"}, status = status.HTTP_401_UNAUTHORIZED)
        
        get_token = RefreshToken.for_user(user_auth)
        
        return Response({"success": "User have successfully login",
                         "access_token": str(get_token.access_token),
                         "refresh_token": str(get_token)}, status= status.HTTP_200_OK)
    except Exception as e:
        print(e)
        return Response({"error": "Network Error"}, status= status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(["POST"])
def user_signup(request):
    pass

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
            user, created = User.objects.get_or_create(email=email, defaults={'username':username})
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