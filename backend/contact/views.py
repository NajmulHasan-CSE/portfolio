import base64
import logging
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.http import JsonResponse
from rest_framework import status
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle
from rest_framework.views import APIView

from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)


def notify_sms(contact_message):
    """Sends an SMS notification through Twilio when all credentials are configured."""
    account_sid = settings.TWILIO_ACCOUNT_SID
    auth_token = settings.TWILIO_AUTH_TOKEN
    from_number = settings.TWILIO_FROM_NUMBER
    to_number = settings.SMS_NOTIFY_PHONE
    if not all((account_sid, auth_token, from_number, to_number)):
        return

    message = contact_message.message
    if len(message) > 500:
        message = f'{message[:497]}...'
    body = (
        f'Portfolio contact from {contact_message.name} ({contact_message.email})\n'
        f'Subject: {contact_message.subject}\n{message}'
    )
    payload = urlencode({'To': to_number, 'From': from_number, 'Body': body}).encode('utf-8')
    credentials = base64.b64encode(f'{account_sid}:{auth_token}'.encode('utf-8')).decode('ascii')
    request = Request(
        f'https://api.twilio.com/2010-04-01/Accounts/{account_sid}/Messages.json',
        data=payload,
        headers={
            'Authorization': f'Basic {credentials}',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        method='POST',
    )
    try:
        with urlopen(request, timeout=10) as response:
            if response.status not in (200, 201, 202):
                logger.error('Twilio rejected the contact SMS with HTTP %s.', response.status)
    except (HTTPError, URLError, TimeoutError, OSError):
        logger.exception('Could not send the contact notification SMS through Twilio.')


class ContactCreateView(APIView):
    """POST /api/contact/ : validate and save a contact message."""

    throttle_classes = [ScopedRateThrottle]
    throttle_scope = 'contact'

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # A filled honeypot means a bot: answer as if it worked, but save nothing.
        if serializer.validated_data.get('website'):
            return Response({'detail': 'Message received.'}, status=status.HTTP_201_CREATED)
        contact_message = serializer.save()
        notify_sms(contact_message)
        return Response({'detail': 'Message received.'}, status=status.HTTP_201_CREATED)


def health(request):
    """GET /api/health/ : simple check that the service is up."""
    return JsonResponse({'status': 'ok'})
