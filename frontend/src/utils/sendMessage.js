import { siteConfig } from '../data/siteConfig';
import { getFormProvider } from './config';

/** Reads the first useful message out of a Django REST framework error response. */
async function readApiError(response) {
  try {
    const data = await response.json();
    if (data.detail) return String(data.detail);
    const first = Object.values(data).flat()[0];
    if (first) return String(first);
  } catch {
    // Not JSON; fall through.
  }
  return 'The server rejected the message.';
}

async function sendEmailNotification(values) {
  const accessKey = siteConfig.form.web3formsAccessKey.trim();
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      name: values.name,
      email: values.email,
      subject: `Portfolio contact: ${values.subject}`,
      message: values.message,
    }),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('The email service returned an unreadable response.');
  }
  if (!response.ok || !result || typeof result !== 'object' || result.success !== true) {
    throw new Error(result?.message || result?.body?.message || 'The email service rejected the message.');
  }
}

/**
 * Saves the contact form in Django, then sends an email through Web3Forms.
 * Resolves with { sent: true } on success and { sent: false } when no backend is
 * configured (nothing is sent in that case). Throws an Error if sending fails.
 */
export async function sendContactMessage(values) {
  const provider = getFormProvider();

  if (provider === 'api') {
    const base = siteConfig.form.apiUrl.trim().replace(/\/+$/, '');
    const response = await fetch(`${base}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        subject: values.subject,
        message: values.message,
      }),
    });
    if (!response.ok) throw new Error(await readApiError(response));

    try {
      await sendEmailNotification(values);
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'Unknown email service error.';
      throw new Error(`Your message was saved, but email delivery failed: ${reason}`);
    }
    return { sent: true };
  }

  return { sent: false };
}
