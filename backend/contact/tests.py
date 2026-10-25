from unittest.mock import MagicMock, patch
from urllib.parse import parse_qs

from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.test import override_settings
from django.urls import reverse
from rest_framework.test import APITestCase

from .models import ContactMessage
from .views import notify_sms

VALID = {
    'name': 'Test Visitor',
    'email': 'visitor@example.org',
    'subject': 'Hello there',
    'message': 'I would like to talk about a frontend role.',
}


class ContactApiTests(APITestCase):
    def setUp(self):
        # The throttle counter lives in the cache; start every test fresh.
        cache.clear()
        self.sms_patcher = patch('contact.views.notify_sms')
        self.notify_sms = self.sms_patcher.start()
        self.addCleanup(self.sms_patcher.stop)
        self.url = reverse('contact-create')

    def test_valid_message_is_saved(self):
        response = self.client.post(self.url, VALID, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 1)
        saved = ContactMessage.objects.get()
        self.assertEqual(saved.email, VALID['email'])
        self.assertFalse(saved.is_read)
        self.notify_sms.assert_called_once_with(saved)

    def test_admin_can_view_saved_messages(self):
        self.client.post(self.url, VALID, format='json')
        get_user_model().objects.create_superuser(
            username='admin',
            email='admin@example.org',
            password='test-password',
        )
        self.assertTrue(self.client.login(username='admin', password='test-password'))

        response = self.client.get(reverse('admin:contact_contactmessage_changelist'))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, VALID['subject'])

    def test_invalid_email_is_rejected(self):
        response = self.client.post(self.url, {**VALID, 'email': 'not-an-email'}, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('email', response.json())
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_short_message_is_rejected(self):
        response = self.client.post(self.url, {**VALID, 'message': 'too short'}, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('message', response.json())

    def test_missing_fields_are_rejected(self):
        response = self.client.post(self.url, {}, format='json')
        self.assertEqual(response.status_code, 400)
        for field in ('name', 'email', 'subject', 'message'):
            self.assertIn(field, response.json())

    def test_honeypot_pretends_success_but_saves_nothing(self):
        response = self.client.post(self.url, {**VALID, 'website': 'http://spam.test'}, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_throttle_blocks_after_five_messages(self):
        for _ in range(5):
            self.assertEqual(self.client.post(self.url, VALID, format='json').status_code, 201)
        self.assertEqual(self.client.post(self.url, VALID, format='json').status_code, 429)

    def test_health_endpoint(self):
        response = self.client.get(reverse('health'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), {'status': 'ok'})

    @override_settings(
        TWILIO_ACCOUNT_SID='ACtest',
        TWILIO_AUTH_TOKEN='test-token',
        TWILIO_FROM_NUMBER='+15550000001',
        SMS_NOTIFY_PHONE='+15550000002',
    )
    @patch('contact.views.urlopen')
    def test_sms_notification_posts_to_twilio(self, mock_urlopen):
        response = MagicMock()
        response.__enter__.return_value = response
        response.status = 201
        mock_urlopen.return_value = response
        contact_message = ContactMessage(**VALID)

        notify_sms(contact_message)

        request = mock_urlopen.call_args.args[0]
        self.assertIn('/Accounts/ACtest/Messages.json', request.full_url)
        self.assertTrue(request.get_header('Authorization').startswith('Basic '))
        payload = parse_qs(request.data.decode('utf-8'))
        self.assertEqual(payload['To'], ['+15550000002'])
        self.assertEqual(payload['From'], ['+15550000001'])
        self.assertIn(VALID['email'], payload['Body'][0])

    @override_settings(
        TWILIO_ACCOUNT_SID='',
        TWILIO_AUTH_TOKEN='',
        TWILIO_FROM_NUMBER='',
        SMS_NOTIFY_PHONE='',
    )
    @patch('contact.views.urlopen')
    def test_sms_notification_is_skipped_without_credentials(self, mock_urlopen):
        notify_sms(ContactMessage(**VALID))
        mock_urlopen.assert_not_called()
