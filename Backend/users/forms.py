from django import forms
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput, label="Password")

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user

class UserLoginForm(forms.Form):
    identifier = forms.CharField(label="Username or Email")
    password = forms.CharField(widget=forms.PasswordInput)

class ProfileUpdateForm(forms.Form):
    username = forms.CharField(max_length=20, required=False)
    email = forms.EmailField(required=False)
    profile_picture = forms.ImageField(required=False)