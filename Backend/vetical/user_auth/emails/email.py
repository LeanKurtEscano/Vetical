from django.core.mail import send_mail
import random
from django.conf import settings



def send_otp_to_email(email,message,action_subject):
    try:
        otp = random.randint(100000,999999)
        subject = f"{action_subject}"
        otp_message = f"{message} is {otp}"
        email_from = settings.EMAIL_HOST
        send_mail(subject, otp_message, email_from,[email])
        return otp
        
    except Exception as e:
        print({e})
        return None