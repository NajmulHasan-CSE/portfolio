import { useState } from 'react';
import { ArrowUpRight, Eye, Mail, Phone } from 'lucide-react';
import Button from '../components/Button';
import CvButton from '../components/CvButton';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { GitHubIcon, LinkedInIcon } from '../components/icons';
import { siteConfig } from '../data/siteConfig';
import { getContactDisplayValue, getContactLinks } from '../utils/config';

const icons = { email: Mail, mobile: Phone, github: GitHubIcon, linkedin: LinkedInIcon };

export default function Links() {
  const links = getContactLinks().filter((item) => item.configured);
  const [showResume, setShowResume] = useState(false);

  return (
    <Section id="links" labelledBy="links-title" className="bg-white/60 dark:bg-white/[0.02]">
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          id="links-title"
          eyebrow="Connect"
          title="Social profiles & contact"
        />

        <ul className="space-y-4">
          {links.map((item) => {
            const Icon = icons[item.id];
            const external = item.id === 'github' || item.id === 'linkedin';

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="card card-hover flex min-w-0 items-center gap-4"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-slate-900 dark:text-white">
                      {item.label}
                    </span>
                    <span className="block break-all text-sm text-slate-600 dark:text-slate-300">
                      {getContactDisplayValue(item)}
                    </span>
                  </span>
                  {external && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-slate-400"
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="card mt-6 flex flex-col items-start justify-between gap-4 border-sky-200/80 bg-gradient-to-br from-white to-sky-50/70 shadow-sm dark:border-sky-400/20 dark:from-slate-900 dark:to-sky-950/20 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900 dark:text-white">Want to know more?</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
              Get a copy of my CV and experience.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              variant="secondary"
              icon={Eye}
              aria-expanded={showResume}
              aria-controls="resume-viewer"
              onClick={() => setShowResume((visible) => !visible)}
            >
              {showResume ? 'Hide Resume' : 'View Resume'}
            </Button>
            <CvButton
              variant="primary"
              className="shrink-0 shadow-md transition-transform hover:-translate-y-0.5"
            />
          </div>
        </div>
        {showResume && (
          <iframe
            id="resume-viewer"
            src={siteConfig.resume.url}
            title="Resume PDF"
            className="mt-4 h-[70vh] min-h-[32rem] w-full rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-navy-800"
          />
        )}
      </div>
    </Section>
  );
}
