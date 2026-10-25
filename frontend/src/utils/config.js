import { siteConfig } from '../data/siteConfig';

const PLACEHOLDER_MARKERS = ['your-username', 'your.email', 'your-name', 'example.com'];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const hasPlaceholderMarker = (value) =>
  PLACEHOLDER_MARKERS.some((marker) => value.toLowerCase().includes(marker));

/** True only for a real-looking http(s) URL that is not a placeholder. */
export function isConfiguredUrl(value) {
  if (typeof value !== 'string') return false;
  const url = value.trim();
  return /^https?:\/\/\S+$/i.test(url) && !hasPlaceholderMarker(url);
}

/** True only for a real-looking email address that is not a placeholder. */
export function isConfiguredEmail(value) {
  if (typeof value !== 'string') return false;
  const email = value.trim();
  return EMAIL_RE.test(email) && !hasPlaceholderMarker(email);
}

/** Email / GitHub / LinkedIn entries with a flag saying whether they are real yet. */
export function getContactLinks() {
  const { email, mobile, github, linkedin } = siteConfig.contact;
  return [
    {
      id: 'email',
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      configured: isConfiguredEmail(email),
      hint: 'Email not set yet. Edit contact.email in frontend/src/data/siteConfig.js',
    },
    {
      id: 'mobile',
      label: 'Mobile',
      value: mobile,
      href: `tel:${mobile}`,
      configured: Boolean(mobile.trim()),
      hint: 'Mobile number not set yet. Edit contact.mobile in frontend/src/data/siteConfig.js',
    },
    {
      id: 'github',
      label: 'GitHub',
      value: github,
      href: github,
      configured: isConfiguredUrl(github),
      hint: 'GitHub link not set yet. Edit contact.github in frontend/src/data/siteConfig.js',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: linkedin,
      href: linkedin,
      configured: isConfiguredUrl(linkedin),
      hint: 'LinkedIn link not set yet. Edit contact.linkedin in frontend/src/data/siteConfig.js',
    },
  ];
}

export function getContactDisplayValue(item) {
  if (item.id === 'github') return 'View GitHub profile';
  if (item.id === 'linkedin') return 'Connect on LinkedIn';
  return item.value;
}

/** The contact form uses the Django backend so messages can trigger SMS alerts. */
export function getFormProvider() {
  const { apiUrl, web3formsAccessKey } = siteConfig.form;
  if (isConfiguredUrl(apiUrl) && web3formsAccessKey.trim()) return 'api';
  return 'none';
}

/** Builds a mailto: link that opens the visitor's email app with their message prefilled. */
export function buildMailto(values) {
  const { email } = siteConfig.contact;
  const subject = encodeURIComponent(values.subject);
  const body = encodeURIComponent(`${values.message}\n\n${values.name} (${values.email})`);
  return `mailto:${email}?subject=${subject}&body=${body}`;
}
