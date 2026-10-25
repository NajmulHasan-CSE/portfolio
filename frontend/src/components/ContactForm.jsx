import { useMemo, useRef, useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from 'lucide-react';
import { sendContactMessage } from '../utils/sendMessage';
import { EMAIL_RE, buildMailto, getFormProvider, isConfiguredEmail } from '../utils/config';
import { siteConfig } from '../data/siteConfig';

const initialValues = { name: '', email: '', subject: '', message: '' };
const MAX_MESSAGE = 2000;

const validators = {
  name: (v) => (v.trim().length < 2 ? 'Please enter your name (at least 2 characters).' : ''),
  email: (v) => (EMAIL_RE.test(v.trim()) ? '' : 'Please enter a valid email address.'),
  subject: (v) => (v.trim().length < 3 ? 'Please add a subject (at least 3 characters).' : ''),
  message: (v) => {
    if (v.trim().length < 10) return 'Please write a message of at least 10 characters.';
    if (v.length > MAX_MESSAGE) return `Please keep your message under ${MAX_MESSAGE} characters.`;
    return '';
  },
};

const fields = [
  { name: 'name', label: 'Name', type: 'text', autoComplete: 'name' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
  { name: 'subject', label: 'Subject', type: 'text', autoComplete: 'off' },
];

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 transition focus:border-sky-500 dark:bg-navy-900 dark:text-white dark:placeholder:text-slate-400 ${
    hasError ? 'border-red-500' : 'border-slate-300 dark:border-white/15'
  }`;

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm text-red-700 dark:text-red-400">
      {message}
    </p>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error | unconfigured
  const [serverError, setServerError] = useState('');
  const formRef = useRef(null);
  const honeypotRef = useRef(null);

  const errors = useMemo(
    () => Object.fromEntries(Object.keys(validators).map((key) => [key, validators[key](values[key])])),
    [values],
  );

  const visibleError = (name) => (touched[name] ? errors[name] : '');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (status !== 'loading' && status !== 'idle') setStatus('idle');
  };

  const handleBlur = (event) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'loading') return;

    setTouched({ name: true, email: true, subject: true, message: true });
    const firstInvalid = Object.keys(errors).find((key) => errors[key]);
    if (firstInvalid) {
      formRef.current?.elements[firstInvalid]?.focus();
      return;
    }

    // Spam trap: real visitors never see or fill this hidden field.
    if (honeypotRef.current?.value) {
      setValues(initialValues);
      setTouched({});
      setStatus('success');
      return;
    }

    setStatus('loading');
    setServerError('');
    try {
      const result = await sendContactMessage(values);
      if (!result.sent) {
        setStatus('unconfigured');
        return;
      }
      setValues(initialValues);
      setTouched({});
      setStatus('success');
    } catch (error) {
      setServerError(error.message || 'Something went wrong.');
      setStatus('error');
    }
  };

  const emailAvailable = isConfiguredEmail(siteConfig.contact.email);
  const loading = status === 'loading';

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact form"
      className="card space-y-5"
    >
      {fields.map((field) => {
        const error = visibleError(field.name);
        const id = `contact-${field.name}`;
        return (
          <div key={field.name}>
            <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-white">
              {field.label}
            </label>
            <input
              id={id}
              name={field.name}
              type={field.type}
              autoComplete={field.autoComplete}
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              aria-invalid={error ? 'true' : 'false'}
              aria-describedby={error ? `${id}-error` : undefined}
              disabled={loading}
              className={inputClass(Boolean(error))}
            />
            <FieldError id={`${id}-error`} message={error} />
          </div>
        );
      })}

      <div>
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-semibold text-slate-900 dark:text-white">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          maxLength={MAX_MESSAGE}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={visibleError('message') ? 'true' : 'false'}
          aria-describedby={visibleError('message') ? 'contact-message-error' : undefined}
          disabled={loading}
          className={`${inputClass(Boolean(visibleError('message')))} resize-y`}
        />
        <div className="flex justify-between gap-4">
          <FieldError id="contact-message-error" message={visibleError('message')} />
          <p className="ml-auto mt-1.5 text-xs text-slate-500 dark:text-slate-400">
            {values.message.length}/{MAX_MESSAGE}
          </p>
        </div>
      </div>

      {/* Honeypot field, hidden from people and assistive technology */}
      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="contact-website">Leave this field empty</label>
        <input id="contact-website" ref={honeypotRef} type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 px-5 py-3 font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" aria-hidden="true" />
            Send message
          </>
        )}
      </button>

      <div role="status" aria-live="polite">
        {status === 'success' && (
          <p className="flex items-start gap-2 rounded-xl border border-emerald-500/40 bg-emerald-50 p-4 text-sm text-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-200">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            Thank you! Your message has been sent.
          </p>
        )}

        {status === 'error' && (
          <div className="flex items-start gap-2 rounded-xl border border-red-500/40 bg-red-50 p-4 text-sm text-red-900 dark:bg-red-400/10 dark:text-red-200">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              The request could not be completed. {serverError}{' '}
              {emailAvailable ? (
                <a href={buildMailto(values)} className="font-semibold underline">
                  Send it from your email app instead
                </a>
              ) : (
                'Please try again later.'
              )}
            </p>
          </div>
        )}

        {status === 'unconfigured' && (
          <div className="flex items-start gap-2 rounded-xl border border-amber-500/50 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-200">
            <Info className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <p>
              This contact form is not connected to a message service yet, so your message was{' '}
              <strong>not sent</strong>.{' '}
              {emailAvailable ? (
                <a href={buildMailto(values)} className="font-semibold underline">
                  Send it from your email app instead
                </a>
              ) : (
                'A direct email address has not been added to this site yet either.'
              )}
            </p>
          </div>
        )}
      </div>

      {process.env.NODE_ENV !== 'production' && getFormProvider() === 'none' && (
        <p className="rounded-xl border border-dashed border-slate-300 p-3 text-xs text-slate-600 dark:border-white/20 dark:text-slate-400">
          <strong>Dev note:</strong> the form is not connected. Set <code>NEXT_PUBLIC_API_URL</code> to your Django backend in the project-root{' '}
          <code>najmul.env</code>, then restart{' '}
          <code>npm run dev</code>. Shown only during development.
        </p>
      )}
    </form>
  );
}
