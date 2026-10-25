import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ScanLine } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { siteConfig } from '../data/siteConfig';

export default function SocialQrCard({ featured = false }) {
  const [linksUrl, setLinksUrl] = useState('');

  useEffect(() => {
    setLinksUrl(new URL('/links', window.location.origin).href);
  }, []);

  return (
    <section
      aria-labelledby="social-qr-title"
      className={
        featured
          ? 'card relative isolate overflow-hidden !rounded-3xl border-sky-200/80 bg-gradient-to-br from-white via-sky-50/80 to-blue-100/70 !p-5 shadow-lg shadow-sky-950/5 dark:border-sky-400/20 dark:from-slate-900 dark:via-slate-900 dark:to-blue-950/40 sm:!p-7'
          : 'card !p-4'
      }
    >
      {featured && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 -z-10 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/10"
        />
      )}
      <div className={featured ? 'relative flex flex-col items-center gap-6 sm:flex-row sm:gap-8' : 'flex items-center gap-3'}>
        <div className={featured ? 'flex shrink-0 flex-col items-center gap-2' : 'shrink-0'}>
          <div
            role="img"
            aria-label="QR code linking to social profiles and contact details"
            className={
              featured
                ? 'rounded-2xl border border-slate-100 bg-white p-2.5 shadow-xl shadow-slate-900/10 ring-1 ring-slate-900/5'
                : 'rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200'
            }
          >
            {linksUrl && (
              <QRCodeSVG
                value={linksUrl}
                size={featured ? 132 : 96}
                level="H"
                className="social-qr-code"
                imageSettings={{
                  src: siteConfig.profileImage,
                  width: featured ? 42 : 26,
                  height: featured ? 42 : 26,
                  excavate: true,
                }}
              />
            )}
          </div>
          {featured && (
            <span className="text-[10px] font-bold tracking-[0.18em] text-slate-500 dark:text-slate-400">
              SCAN TO CONNECT
            </span>
          )}
        </div>
        <div className={featured ? 'min-w-0 text-center sm:text-left' : 'min-w-0'}>
          {featured && (
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-sky-200/80 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-sky-800 dark:border-sky-400/20 dark:bg-white/5 dark:text-sky-200">
              <ScanLine aria-hidden="true" className="h-3.5 w-3.5" />
              DIGITAL BUSINESS CARD
            </span>
          )}
          <h3 id="social-qr-title" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-2xl">
            {featured ? 'One scan. Every way to connect.' : 'Scan to connect'}
          </h3>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300 sm:text-base">
            Scan the code to find all my social profiles and contact details in one place.
          </p>
          <Link
            href="/links"
            className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sky-700 to-blue-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-sky-900/15 transition hover:-translate-y-0.5 hover:from-sky-800 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:from-sky-400 dark:to-blue-400 dark:text-slate-950 dark:hover:from-sky-300 dark:hover:to-blue-300 sm:justify-start"
          >
            View all links
            {featured && <ArrowUpRight aria-hidden="true" className="h-4 w-4" />}
          </Link>
        </div>
      </div>
    </section>
  );
}
