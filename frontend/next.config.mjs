import { existsSync } from 'node:fs';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

const environmentPath = fileURLToPath(new URL('../najmul.env', import.meta.url));
const localEnvironment = existsSync(environmentPath)
  ? (dotenv.config({ path: environmentPath }).parsed ?? {})
  : {};

function publicEnvironmentValue(nextKey, viteKey) {
  const value =
    process.env[nextKey] ??
    process.env[viteKey] ??
    localEnvironment[nextKey] ??
    localEnvironment[viteKey] ??
    '';
  if (nextKey === 'NEXT_PUBLIC_API_URL' && value && !/^https?:\/\//i.test(value)) {
    return `https://${value}`;
  }
  return value;
}

const publicEnvironment = {
  NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY: publicEnvironmentValue(
    'NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY',
    'VITE_WEB3FORMS_ACCESS_KEY',
  ),
  NEXT_PUBLIC_API_URL: publicEnvironmentValue('NEXT_PUBLIC_API_URL', 'VITE_API_URL'),
  NEXT_PUBLIC_FORMSPREE_ENDPOINT: publicEnvironmentValue(
    'NEXT_PUBLIC_FORMSPREE_ENDPOINT',
    'VITE_FORMSPREE_ENDPOINT',
  ),
  NEXT_PUBLIC_EMAILJS_SERVICE_ID: publicEnvironmentValue(
    'NEXT_PUBLIC_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_SERVICE_ID',
  ),
  NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: publicEnvironmentValue(
    'NEXT_PUBLIC_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
  ),
  NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: publicEnvironmentValue(
    'NEXT_PUBLIC_EMAILJS_PUBLIC_KEY',
    'VITE_EMAILJS_PUBLIC_KEY',
  ),
};

export default {
  env: publicEnvironment,
  outputFileTracingRoot: fileURLToPath(new URL('.', import.meta.url)),
};
