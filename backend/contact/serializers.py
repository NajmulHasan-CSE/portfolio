from rest_framework import serializers

from .models import ContactMessage


class ContactMessageSerializer(serializers.ModelSerializer):
    """Validates the contact form. The rules mirror the frontend's validation."""

    name = serializers.CharField(min_length=2, max_length=100)
    subject = serializers.CharField(min_length=3, max_length=150)
    message = serializers.CharField(min_length=10, max_length=2000)

    # Honeypot: real visitors never see or fill this hidden field.
    website = serializers.CharField(required=False, allow_blank=True, write_only=True)

    class Meta:
        model = ContactMessage
        fields = ['name', 'email', 'subject', 'message', 'website']

    def create(self, validated_data):
        validated_data.pop('website', None)
        return super().create(validated_data)
