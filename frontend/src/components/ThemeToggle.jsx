import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    let savedTheme;
    try {
      savedTheme = localStorage.getItem('theme');
    } catch {
      savedTheme = null;
    }
    setTheme(
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : document.documentElement.classList.contains('dark')
          ? 'dark'
          : 'light',
    );
  }, []);

  useEffect(() => {
    if (theme === null) return;
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still switches for this visit.
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', theme === 'dark' ? '#151b16' : '#f7f6f1');
  }, [theme]);

  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} mode`}
      title={`Switch to ${next} mode`}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-300 bg-white text-slate-700 transition hover:border-sky-500 hover:text-sky-700 dark:border-white/15 dark:bg-white/5 dark:text-slate-200 dark:hover:border-sky-400 dark:hover:text-white"
    >
      {theme === 'dark' ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}
