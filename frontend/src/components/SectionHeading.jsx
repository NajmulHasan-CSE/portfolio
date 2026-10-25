export default function SectionHeading({ id, eyebrow, title, description, className = '' }) {
  return (
    <div className={`mb-12 max-w-2xl ${className}`}>
      <p className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-300">
        <span aria-hidden="true" className="h-px w-7 bg-sky-600 dark:bg-sky-300" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-[2.65rem] dark:text-white"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
          {description}
        </p>
      )}
    </div>
  );
}
