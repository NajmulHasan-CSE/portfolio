import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import CvButton from './CvButton';
import ThemeToggle from './ThemeToggle';
import { navLinks } from '../data/navigation';
import { siteConfig } from '../data/siteConfig';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef(null);
  const activePath = usePathname() || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close the mobile menu with Escape and return focus to the menu button.
  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const linkClass = (path) =>
    `nav-link rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-300 ${
      activePath === path
        ? 'is-active text-[#9b252b] dark:text-[#e5bd58]'
        : 'text-slate-600 hover:text-[#9b252b] dark:text-slate-300 dark:hover:text-[#e5bd58]'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur transition ${
        scrolled || open
          ? 'border-[#e8e5db] bg-[#f7f6f1]/90 shadow-[0_8px_30px_-24px_rgba(26,42,30,0.5)] dark:border-white/10 dark:bg-navy-950/90'
          : 'border-transparent bg-[#f7f6f1]/70 dark:bg-navy-950/50'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 rounded-lg text-slate-900 dark:text-white"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-sm font-bold text-white shadow-md shadow-sky-900/15"
          >
            NH
          </span>
          <span className="font-semibold">{siteConfig.name}</span>
        </Link>

        <ul className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={linkClass(link.path)}
                aria-current={activePath === link.path ? 'page' : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden xl:block">
            <CvButton size="sm" />
          </div>
          <ThemeToggle />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:border-[#d2ae62] hover:text-[#9b252b] xl:hidden dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-[#c9a64e] dark:hover:text-[#e5bd58]"
          >
            {open ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-[#e8e5db] bg-[#f7f6f1]/95 shadow-xl shadow-slate-900/[0.06] backdrop-blur-xl xl:hidden dark:border-white/10 dark:bg-navy-950/95"
      >
        <ul className="mx-auto grid max-w-7xl grid-cols-1 gap-2 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-3 lg:px-10">
          {navLinks.map(({ path, label, icon: Icon }) => {
            const isActive = activePath === path;
            return (
              <li key={path}>
                <Link
                  href={path}
                  onClick={() => setOpen(false)}
                  className={`mobile-nav-link group flex h-full items-center gap-3 rounded-xl border p-3 transition-colors duration-300 ${
                    isActive
                      ? 'is-active border-[#d2ae62] bg-[#fffaf0] dark:border-[#c9a64e]/50 dark:bg-[#c9a64e]/10'
                      : 'border-slate-200 bg-white hover:border-[#d2ae62] hover:bg-[#fffaf0] dark:border-white/10 dark:bg-white/[0.03] dark:hover:border-[#c9a64e]/50 dark:hover:bg-[#c9a64e]/[0.06]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                      isActive
                        ? 'bg-gradient-to-br from-[#9b252b] to-[#c49a3a] text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 dark:bg-white/[0.07] dark:text-slate-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`min-w-0 text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? 'text-[#9b252b] dark:text-[#e5bd58]'
                      : 'text-slate-900 group-hover:text-[#9b252b] dark:text-white dark:group-hover:text-[#e5bd58]'
                  }`}>
                    {label}
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="pt-1 sm:col-span-2 lg:col-span-3">
            <CvButton className="w-full" />
          </li>
        </ul>
      </div>
    </header>
  );
}
