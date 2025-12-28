from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.core import mail
from .models import CustomUser, EmailVerificationToken, PasswordResetToken

class LoginVerifiedUserTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="johndoe",
            email="johndoe@example.com",
            password="password123",
            is_email_verified=True
        )
        self.url = reverse("login") 

    def test_login_with_username(self):
        data = {"login": "johndoe", "password": "password123"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tokens", response.data)

    def test_login_with_email(self):
        data = {"login": "johndoe@example.com", "password": "password123"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("tokens", response.data)

class LoginTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="janedoe",
            email="janedoe@example.com",
            password="password123",
            is_email_verified=False
        )
        self.url = reverse("login")

    def test_login_fails_if_not_verified_username(self):
        data = {"login": "janedoe", "password": "password123"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)
        self.assertEqual(str(response.data["detail"]), "Email not verified")

    def test_login_fails_if_not_verified_email(self):
        data = {"login": "janedoe@example.com", "password": "password123"}
        response = self.client.post(self.url, data)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
        self.assertIn("detail", response.data)
        self.assertEqual(str(response.data["detail"]), "Email not verified")

class RegisterUserTest(APITestCase):
    def test_user_registration(self):
        url = reverse("register")
        data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "StrongPass123"
        }

        response = self.client.post(url, data)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(CustomUser.objects.filter(email="test@example.com").exists())

        user = CustomUser.objects.get(email="test@example.com")
        self.assertFalse(user.is_email_verified)
        self.assertTrue(EmailVerificationToken.objects.filter(user=user).exists())
        self.assertEqual(len(mail.outbox), 1)

class EmailVerificationTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="verifyuser",
            email="verify@example.com",
            password="TestPass123"
        )
        self.token = EmailVerificationToken.objects.create(user=self.user)

    def test_verify_email_success(self):
        url = reverse("verify-email")
        response = self.client.post(url, {"token": str(self.token.token)})

        self.user.refresh_from_db()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(self.user.is_email_verified)

    def test_verify_email_invalid_token(self):
        url = reverse("verify-email")
        response = self.client.post(url, {"token": "invalid-token"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class PasswordResetRequestTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="resetuser",
            email="reset@example.com",
            password="OldPass123"
        )

    def test_password_reset_request(self):
        url = reverse("password-reset")
        response = self.client.post(url, {"email": "reset@example.com"})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(PasswordResetToken.objects.filter(user=self.user).exists())

class PasswordResetConfirmTest(APITestCase):
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="confirmuser",
            email="confirm@example.com",
            password="OldPass123"
        )
        self.token = PasswordResetToken.objects.create(user=self.user)

    def test_password_reset_confirm(self):
        url = reverse("password-reset-confirm")
        data = {
            "token": str(self.token.token),
            "new_password": "NewStrongPass123"
        }
        response = self.client.post(url, data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        self.user.refresh_from_db()
        self.assertTrue(self.user.check_password("NewStrongPass123"))
