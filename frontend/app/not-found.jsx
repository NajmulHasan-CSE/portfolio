import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-3 text-slate-600 dark:text-slate-300">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white hover:bg-sky-700"
      >
        Back to home
      </Link>
    </section>
  );
}
