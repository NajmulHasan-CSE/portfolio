import { ArrowUp, Mail, Phone } from 'lucide-react';
import Link from 'next/link';
import IconLink from './IconLink';
import { GitHubIcon, LinkedInIcon } from './icons';
import { navLinks } from '../data/navigation';
import { siteConfig } from '../data/siteConfig';
import { getContactLinks } from '../utils/config';

const icons = { email: Mail, mobile: Phone, github: GitHubIcon, linkedin: LinkedInIcon };

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#e8e5db] bg-white/75 py-12 backdrop-blur-sm dark:border-white/10 dark:bg-navy-900/80">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-lg font-bold text-slate-900 dark:text-white">{siteConfig.name}</p>
          <p className="mt-1 text-sm">{siteConfig.role}</p>
          <div className="mt-4 flex gap-3">
            {getContactLinks()
              .filter((item) => item.configured)
              .map((item) => (
                <IconLink
                  key={item.id}
                  href={item.href}
                  label={item.label}
                  icon={icons[item.id]}
                  configured={item.configured}
                  hint={item.hint}
                />
              ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-900 dark:text-white">
            Quick links
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  className="rounded hover:text-sky-700 dark:hover:text-sky-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:text-right">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:border-sky-500 hover:text-sky-700 dark:border-white/15 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:text-white"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
            Back to top
          </Link>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl border-t border-[#e8e5db] px-4 pt-6 text-sm dark:border-white/10 sm:px-6 lg:px-8">
        &copy; {year} {siteConfig.name}. All rights reserved.
      </p>
    </footer>
  );
}
