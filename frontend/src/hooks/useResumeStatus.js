import { useEffect, useState } from 'react';
import { siteConfig } from '../data/siteConfig';

let pending;

/**
 * Checks once whether the CV file really exists and is a PDF. A missing file on the
 * A development server can return the app's HTML page (status 200), so the content type is
 * checked as well as the status code.
 */
function checkResume() {
  if (!pending) {
    pending = fetch(siteConfig.resume.url, { method: 'HEAD', cache: 'no-store' })
      .then(
        (response) =>
          response.ok && (response.headers.get('content-type') || '').toLowerCase().includes('pdf'),
      )
      .catch(() => false);
  }
  return pending;
}

/** 'checking' | 'available' | 'missing' */
export default function useResumeStatus() {
  const [status, setStatus] = useState('checking');

  useEffect(() => {
    let alive = true;
    checkResume().then((ok) => {
      if (alive) setStatus(ok ? 'available' : 'missing');
    });
    return () => {
      alive = false;
    };
  }, []);

  return status;
}
