from django.urls import path
from .views import RegisterView, LoginView, UserView, CustomTokenRefreshView, PasswordResetRequestView, PasswordResetConfirmView
from django.contrib.auth import views as auth_views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('me/', UserView.as_view(), name='user'),
    #path("verify-email/", EmailVerificationView.as_view(), name="verify-email"),
    path("password-reset/", PasswordResetRequestView.as_view(), name="password-reset"),
    path("password-reset-confirm/", PasswordResetConfirmView.as_view(), name="password-reset-confirm"),
    path("update-profile-picture/", UserView.as_view(), name="update-profile-picture")

]