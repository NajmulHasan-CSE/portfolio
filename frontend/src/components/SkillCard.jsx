/**
 * One skill category. "Learning" categories use a dashed border and an amber badge
 * so they cannot be mistaken for skills I already work with.
 */
export default function SkillCard({ category }) {
  const { title, badge, description, icon: Icon, learning, items } = category;

  return (
    <div
      className={`card card-hover h-full ${
        learning ? 'border-dashed border-amber-400/70 dark:border-amber-300/40' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            learning
              ? 'bg-amber-100 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300'
              : 'bg-gradient-to-br from-sky-600 to-blue-600 text-white'
          }`}
        >
          <Icon className="h-5 w-5" />
        </span>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            learning
              ? 'bg-amber-100 text-amber-900 dark:bg-amber-400/15 dark:text-amber-300'
              : 'bg-sky-100 text-sky-800 dark:bg-sky-400/15 dark:text-sky-300'
          }`}
        >
          {badge}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{description}</p>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${title} list`}>
        {items.map((item) => (
          <li
            key={item}
            className={`chip ${
              learning
                ? '!border-dashed !border-amber-400/70 !bg-transparent dark:!border-amber-300/40'
                : ''
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
