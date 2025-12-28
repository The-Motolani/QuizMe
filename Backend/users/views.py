from django.shortcuts import render
from django.views.generic.edit import CreateView
from rest_framework.response import Response
from django.urls import reverse_lazy
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from uuid import UUID
from django.contrib.auth.decorators import user_passes_test, login_required
from .forms import UserLoginForm, UserRegistrationForm
from .models import CustomUser, PasswordResetToken, UserProfile
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, permissions, status
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, CustomTokenRefreshSerializer
from django.contrib.auth.hashers import make_password
from django.core.mail import send_mail
from django.conf import settings
from django.core.exceptions import ValidationError
from rest_framework.exceptions import AuthenticationFailed
from .tokens import get_tokens_for_user

User = get_user_model()

# Registration
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes= [permissions.AllowAny]

# Login 
class LoginView(APIView):
    permission_classes= [permissions.AllowAny]
    
    def post(self, request):
        serializer_class = LoginSerializer(data=request.data)
        serializer_class.is_valid(raise_exception=True)

        user = serializer_class.validated_data['user']
        tokens = get_tokens_for_user(user)

        return Response(
            {
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
                "tokens": tokens,
            },
            status=status.HTTP_200_OK,
        )

# Refresh 
class CustomTokenRefreshView(TokenRefreshView):
    serializer = CustomTokenRefreshSerializer

class UserView(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        profile, created = UserProfile.objects.get_or_create(user=self.request.user)
        return profile
    
# class EmailVerificationView(APIView):
#     permission_classes = []

#     def post(self, request):
#         token = request.data.get('token')

#         try:
#             UUID(token)
#         except (ValueError, TypeError):
#             return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        
#         try:
#             verification_record = EmailVerificationToken.objects.get(token=token)
#         except EmailVerificationToken.DoesNotExist:
#             return Response({"detail": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        
#         if verification_record.is_expired():
#             return Response({"detail": "Token has expired."}, status=status.HTTP_400_BAD_REQUEST)
        
#         user = verification_record.user
#         user.is_email_verified = True
#         user.save()
#         verification_record.delete()

#         return Response({"detail": "Email verified successfully."}, status=status.HTTP_200_OK)

class PasswordResetRequestView(APIView):
    permission_classes = []

    def post(self, request):
        email = request.data.get("email")
        user = CustomUser.objects.filter(email=email).first()

        if not user:
            return Response({"message": "If email exists, reset link sent"})

        token = PasswordResetToken.objects.create(user=user)

        reset_link = f"http://localhost:3000/reset-password?token={token.token}"

        send_mail(
            "Reset your password",
            f"Reset password link: {reset_link}",
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
        )

        return Response({"message": "Password reset link sent"})


class PasswordResetConfirmView(APIView):
    permission_classes = []

    def post(self, request):
        token = request.data.get("token")
        new_password = request.data.get("new_password")

        try:
            record = PasswordResetToken.objects.get(token=token)
        except PasswordResetToken.DoesNotExist:
            return Response({"error": "Invalid token"}, status=400)

        if record.is_expired():
            return Response({"error": "Token expired"}, status=400)

        user = record.user
        user.password = make_password(new_password)
        user.save()
        record.delete()

        return Response({"message": "Password reset successful"})

