from django.urls import path
from .views import CategoryUpdateView

urlpatterns = [
    path('category/<int:pk>/update/', CategoryUpdateView.as_view(), name='category_update'),
]
