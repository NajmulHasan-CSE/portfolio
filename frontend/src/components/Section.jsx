/** Page section with a consistent container and vertical rhythm. */
export default function Section({ id, labelledBy, className = '', children }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`relative py-20 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
