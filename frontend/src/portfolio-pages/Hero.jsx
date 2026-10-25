import { ArrowDown, ArrowRight, Mail, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import CvButton from '../components/CvButton';
import IconLink from '../components/IconLink';
import SocialQrCard from '../components/SocialQrCard';
import { GitHubIcon, LinkedInIcon } from '../components/icons';
import { siteConfig } from '../data/siteConfig';
import { getContactLinks } from '../utils/config';

const icons = { email: Mail, mobile: Phone, github: GitHubIcon, linkedin: LinkedInIcon };

const code = [
  { indent: 0, tokens: [['keyword', 'const '], ['name', 'developer'], ['punct', ' = {']] },
  { indent: 1, tokens: [['key', 'name'], ['punct', ': '], ['string', '"Md. Najmul Hasan"'], ['punct', ',']] },
  { indent: 1, tokens: [['key', 'role'], ['punct', ': '], ['string', '"Frontend Developer"'], ['punct', ',']] },
  {
    indent: 1,
    tokens: [
      ['key', 'focus'],
      ['punct', ': ['],
      ['string', '"React"'],
      ['punct', ', '],
      ['string', '"Tailwind CSS"'],
      ['punct', ', '],
      ['string', '"Responsive UI"'],
      ['punct', '],'],
    ],
  },
  {
    indent: 1,
    tokens: [
      ['key', 'learning'],
      ['punct', ': ['],
      ['string', '"Python"'],
      ['punct', ', '],
      ['string', '"Django"'],
      ['punct', ', '],
      ['string', '"AI/ML"'],
      ['punct', '],'],
    ],
  },
  { indent: 1, tokens: [['key', 'goal'], ['punct', ': '], ['string', '"Junior Frontend Developer role"'], ['punct', ',']] },
  { indent: 0, tokens: [['punct', '};']] },
  { indent: 0, tokens: [] },
  { indent: 0, tokens: [['keyword', 'export default '], ['name', 'developer'], ['punct', ';']] },
];

const tokenClass = {
  keyword: 'text-sky-300',
  name: 'text-sky-300',
  key: 'text-blue-300',
  string: 'text-emerald-300',
  punct: 'text-slate-400',
};

const letterVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

function RevealLetters({ text, delay = 0 }) {
  return (
    <span>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className="inline-block"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { delayChildren: delay, staggerChildren: 0.045 },
          },
        }}
      >
        {Array.from(text).map((character, index) => (
          <motion.span
            key={`${character}-${index}`}
            className="inline-block whitespace-pre"
            variants={letterVariants}
            transition={{ duration: 0.32, ease: [0.2, 0.75, 0.25, 1] }}
          >
            {character}
          </motion.span>
        ))}
      </motion.span>
    </span>
  );
}

function CodeWindow() {
  return (
    <div
      role="img"
      aria-label="Code editor graphic showing a JavaScript object that describes Md. Najmul Hasan: a frontend developer focused on React, Tailwind CSS and responsive UI, currently learning Python, Django and AI/ML."
      className="overflow-hidden rounded-2xl border border-white/10 bg-navy-900 shadow-2xl shadow-sky-900/30"
    >
      <div className="flex items-center justify-between border-b border-white/10 bg-navy-800 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-400" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-400" />
          <span className="ml-2 rounded-md bg-navy-900 px-3 py-1 font-mono text-xs text-slate-300 sm:ml-2">
            developer.js
          </span>
        </div>
        <img
          src={siteConfig.profileImage}
          alt="Md. Najmul Hasan"
          width="48"
          height="48"
          className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover object-top shadow-md ring-2 ring-sky-300/40"
        />
      </div>
      <div className="overflow-x-auto p-5 font-mono text-[13px] leading-7 sm:text-sm">
        {code.map((line, index) => (
          <div key={index} className="flex h-7 whitespace-pre">
            <span className="w-8 shrink-0 select-none pr-4 text-right text-slate-500">{index + 1}</span>
            <span style={{ paddingLeft: `${line.indent * 1.5}rem` }}>
              {line.tokens.map(([type, text], i) => (
                <span key={i} className={tokenClass[type]}>
                  {text}
                </span>
              ))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const { availability } = siteConfig;
  const roles = siteConfig.roles.split('|').map((role) => role.trim());

  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-[#e7eadf]/80 blur-3xl dark:bg-sky-600/10" />
        <div className="absolute -right-40 top-20 h-[30rem] w-[30rem] rounded-full bg-[#e2e8de]/70 blur-3xl dark:bg-blue-600/10" />
      </div>

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-10 lg:py-20">
        <div className="w-full min-w-0 max-w-2xl">
          {availability.show && (
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-emerald-50 px-3.5 py-1.5 text-sm font-medium text-emerald-900 dark:bg-emerald-400/10 dark:text-emerald-300">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-500" />
              {availability.label}
            </p>
          )}

          <p className="mb-4 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-sky-700 dark:text-sky-300">
            <span aria-hidden="true" className="h-px w-8 bg-sky-600 dark:bg-sky-300" />
            <RevealLetters text="Hello, I'm" />
          </p>
          <h1
            id="hero-title"
            className="text-gradient overflow-visible pb-2 text-4xl font-extrabold leading-[1.2] tracking-[-0.045em] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
          >
            <RevealLetters text={siteConfig.name} delay={0.55} />
          </h1>
          <ul aria-label="Professional roles" className="mt-6 flex flex-wrap gap-2">
            {roles.map((role) => (
              <li
                key={role}
                className="rounded-full border border-[#e4e4d9] bg-white/80 px-3.5 py-2 text-xs font-medium text-slate-700 shadow-sm shadow-slate-900/[0.03] dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 sm:text-sm"
              >
                {role}
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-xl text-2xl font-semibold leading-[1.2] tracking-tight text-slate-900 sm:text-3xl lg:text-[2.15rem] dark:text-white">
            {siteConfig.headline}
          </p>
          <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-[1.05rem] sm:leading-8 dark:text-slate-300">
            {siteConfig.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/projects" icon={ArrowRight} className="shadow-lg shadow-sky-600/20">
              View Projects
            </Button>
            <CvButton className="border-slate-300 bg-white/70 shadow-sm dark:border-white/15 dark:bg-white/[0.04]" />
            <Button href="/contact" variant="ghost">
              Let&apos;s talk
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            {getContactLinks()
              .filter((item) => item.id !== 'email' && item.configured)
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

          <div className="mt-6 max-w-md">
            <SocialQrCard />
          </div>

          <a
            href="#page-directory-title"
            className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-300"
          >
            Explore the portfolio
            <ArrowDown className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="relative mx-auto min-h-[34rem] w-full max-w-xl lg:min-h-[38rem] lg:max-w-none">
          <div
            aria-hidden="true"
            className="absolute right-[8%] top-8 -z-10 aspect-square w-[72%] rounded-full border border-[#d8dfd3] bg-[#e9ece4] dark:border-white/10 dark:bg-[#202b22]"
          />
          <div className="hero-portrait absolute right-[7%] top-0 w-[76%] max-w-[23rem] overflow-hidden rounded-[48%_48%_1.5rem_1.5rem] border border-[#e2dfd4] bg-[#eeeee7] shadow-[0_30px_80px_-38px_rgba(24,38,27,0.48)] dark:border-white/10 dark:bg-navy-900">
            <img
              src={siteConfig.profileImage}
              alt="Portrait of Md. Najmul Hasan"
              width="620"
              height="697"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
          <div className="absolute right-0 top-6 z-10 inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/95 px-4 py-2.5 text-xs font-semibold text-slate-700 shadow-lg shadow-slate-900/[0.06] dark:border-white/10 dark:bg-navy-800/95 dark:text-slate-200">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-sky-600 ring-4 ring-sky-600/10" />
            {siteConfig.role}
          </div>
          <div className="absolute bottom-1 left-0 z-10 w-[88%] max-w-[27rem]">
            <CodeWindow />
          </div>
          <div className="absolute bottom-0 right-0 z-20 max-w-[15rem] rounded-2xl border border-[#e8e5db] bg-white/95 px-4 py-3 shadow-xl shadow-slate-900/[0.08] backdrop-blur dark:border-white/10 dark:bg-navy-800/95">
            <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Currently building with</p>
            <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-white">React · Tailwind CSS · Django</p>
          </div>
        </div>
      </div>
    </section>
  );
}
