from django.contrib.auth.backends import BaseBackend
from user_auth.models import CustomUser


#Custom authentication settings using email
class EmailBackend(BaseBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
          
            user = CustomUser.objects.get(email=username)
                 
            if user.check_password(password):
                return user  
            else:
                return None  
        except CustomUser.DoesNotExist:
          
            return None  
        except Exception as e:

            print(f"Error during authentication: {str(e)}")
            return None
