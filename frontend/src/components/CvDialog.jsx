import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';

/**
 * Shown when the CV file is unavailable, so the button never pretends to download it.
 * Uses the native <dialog> element, which provides focus trapping and Escape-to-close.
 */
export default function CvDialog({ onClose }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      aria-labelledby="cv-dialog-title"
      className="m-auto w-[min(92vw,30rem)] rounded-2xl border border-slate-200 bg-white p-0 text-slate-700 shadow-2xl backdrop:bg-black/60 dark:border-white/10 dark:bg-navy-800 dark:text-slate-300"
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h2 id="cv-dialog-title" className="text-xl font-bold text-slate-900 dark:text-white">
            CV coming soon
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <p className="mt-3 text-sm leading-relaxed">
          My CV is being prepared. Please check back soon.
        </p>

        <div className="mt-6 flex justify-end">
          <Button variant="primary" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </dialog>
  );
}
