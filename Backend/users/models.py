from django.db import models
from django.contrib.auth.models import User, AbstractUser
import uuid
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.conf import settings

class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    is_email_verified = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']  # email is required at registration

    def __str__(self):
        return self.username
        
def user_profile_picture_path(instance, filename):
    return f"profile_pics/user_{instance.id}/{filename}"

class UserProfile(models.Model):
    profile_picture = models.ImageField(
        upload_to=user_profile_picture_path,
        blank=True,
        null=True
    )
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name = "user_profile"
    )

class EmailVerificationToken(models.Model):
    user = models.OneToOneField(
        CustomUser,
        on_delete=models.CASCADE,
        related_name="email_verification"
    )
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(hours=24)

    def __str__(self):
        return f"Verification token for {self.user.email}"
    
class PasswordResetToken(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def is_expired(self):
        return timezone.now() > self.created_at + timezone.timedelta(hours=1)
