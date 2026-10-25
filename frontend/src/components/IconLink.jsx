/**
 * Round icon link for GitHub / LinkedIn / email.
 * When `configured` is false the link is replaced by a dashed, inert placeholder
 * so visitors never land on a fake URL.
 */
export default function IconLink({ href, label, icon: Icon, configured, hint, className = '' }) {
  const shared =
    'inline-flex h-11 w-11 items-center justify-center rounded-xl border transition duration-200';

  if (!configured) {
    return (
      <button
        type="button"
        aria-disabled="true"
        title={hint}
        onClick={(event) => event.preventDefault()}
        className={`${shared} cursor-not-allowed border-dashed border-slate-300 text-slate-500 dark:border-white/20 dark:text-slate-400 ${className}`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
        <span className="sr-only">
          {label} (not set yet). {hint}
        </span>
      </button>
    );
  }

  const isMail = href.startsWith('mailto:');
  const externalProps = isMail ? {} : { target: '_blank', rel: 'noopener noreferrer' };

  return (
    <a
      href={href}
      title={label}
      className={`${shared} border-slate-300 bg-white text-slate-700 hover:border-sky-500 hover:text-sky-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-white ${className}`}
      {...externalProps}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
      <span className="sr-only">
        {label}
        {isMail ? '' : ' (opens in a new tab)'}
      </span>
    </a>
  );
}
