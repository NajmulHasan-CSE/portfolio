from django.urls import path

from .views import ContactCreateView, health

urlpatterns = [
    path('contact/', ContactCreateView.as_view(), name='contact-create'),
    path('health/', health, name='health'),
]
