import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import { navLinks } from '../data/navigation';

export default function PageDirectory() {
  const pages = navLinks.filter((link) => link.path !== '/');

  return (
    <section
      aria-labelledby="page-directory-title"
      className="border-t border-slate-200 bg-white/60 py-20 dark:border-white/10 dark:bg-white/[0.02] sm:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="page-directory-title"
          eyebrow="Explore"
          title="Explore my portfolio"
          description="Choose a page to learn more about my skills, projects and experience."
        />

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pages.map(({ path, label, description, icon: Icon }, index) => (
            <Reveal as="li" key={path} delay={index * 0.05}>
              <Link href={path} className="card card-hover group flex h-full items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2 font-semibold text-slate-900 dark:text-white">
                    {label}
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-sky-600 dark:group-hover:text-sky-300"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {description}
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>

      </div>
    </section>
  );
}
