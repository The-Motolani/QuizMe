from rest_framework import serializers
from .models import CustomUser, UserProfile
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = [
            "id",
            "username",
            "email",
        ]
        read_only_fields = ["id"]

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
    
        # token = EmailVerificationToken.objects.create(user=user)

        # verification_link = f"http://localhost:3000/verify-email?token={token.token}"

        # send_mail(
        #     subject="Verify your QuizMe! account",
        #     message=f"Click to verify your email: {verification_link}",
        #     from_email=settings.DEFAULT_FROM_EMAIL,
        #     recipient_list=[user.email],
        # )

        return user

class CustomTokenRefreshSerializer(TokenRefreshSerializer):
    pass

# class EmailVerificationSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = EmailVerificationToken
#         fields = ['token']
#         token = serializers.UUIDField()

class LoginSerializer(serializers.Serializer):
    login = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        login = data.get("login")
        password = data.get("password")

        # Try to authenticate by username first, then by email
        user = authenticate(username=login, password=password)
        if not user:
            try:
                user_obj = CustomUser.objects.get(email=login)
                user = authenticate(username=user_obj.username, password=password)
            except CustomUser.DoesNotExist:
                user = None

        if not user:
            raise AuthenticationFailed("Invalid credentials")

        # if not user.is_email_verified:
        #     raise AuthenticationFailed("Email not verified")

        data["user"] = user
        return data
    
class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.UUIDField()
    new_password = serializers.CharField(min_length=8)