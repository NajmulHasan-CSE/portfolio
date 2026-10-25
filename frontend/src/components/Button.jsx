import Link from 'next/link';

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200';

const variants = {
  primary:
    'bg-gradient-to-r from-sky-600 to-blue-600 text-white shadow-glow hover:brightness-110 active:brightness-95',
  secondary:
    'border border-slate-300 bg-white text-slate-800 hover:border-sky-500 hover:text-sky-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:text-white',
  ghost:
    'text-sky-700 hover:bg-sky-500/10 dark:text-sky-300 dark:hover:bg-sky-400/10',
};

const sizes = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-3 text-sm sm:text-base',
};

/**
 * Link-or-button with consistent styling.
 *  - `href` renders an <a>; `external` opens it in a new tab safely.
 *  - `disabledReason` renders an honest, unavailable button (never a dead link).
 */
export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  external = false,
  disabledReason,
  className = '',
  children,
  ...rest
}) {
  if (disabledReason) {
    return (
      <button
        type="button"
        aria-disabled="true"
        title={disabledReason}
        onClick={(event) => event.preventDefault()}
        className={`${base} ${sizes[size]} cursor-not-allowed border border-dashed border-slate-300 bg-transparent text-slate-500 dark:border-white/20 dark:text-slate-400 ${className}`}
      >
        {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
        {children}
        <span className="sr-only"> ({disabledReason})</span>
      </button>
    );
  }

  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  const content = (
    <>
      {Icon && <Icon aria-hidden="true" className="h-4 w-4" />}
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (href) {
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    if (!external && href.startsWith('/') && !rest.download) {
      return (
        <Link href={href} className={classes} {...rest}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
