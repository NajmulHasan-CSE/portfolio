import { Hammer, Monitor, Rocket } from 'lucide-react';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { siteConfig } from '../data/siteConfig';

const highlights = [
  {
    icon: Monitor,
    title: 'Frontend first',
    text: 'Responsive, accessible interfaces with HTML, CSS, JavaScript, React and Tailwind CSS.',
  },
  {
    icon: Hammer,
    title: 'Learning by building',
    text: 'I practise on real projects, focusing on clean code and practical problem-solving.',
  },
  {
    icon: Rocket,
    title: 'Data-driven development',
    text: 'Applying Python, machine learning and data science to intelligent software solutions.',
  },
];

export default function About() {
  return (
    <Section id="about" labelledBy="about-title" className="bg-white/60 dark:bg-white/[0.02]">
      <SectionHeading id="about-title" eyebrow="About" title="About me" />

      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-12">
        <Reveal className="relative mx-auto w-full max-w-[220px] md:mx-0 lg:max-w-[260px]">
          <div
            aria-hidden="true"
            className="absolute inset-2 translate-x-2 translate-y-2 rounded-3xl border-2 border-sky-300/70 dark:border-sky-400/40"
          />
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-sky-950/10 dark:border-white/10">
            <img
              src={siteConfig.profileImage}
              alt="Portrait of Md. Najmul Hasan"
              width="620"
              height="697"
              className="aspect-[4/5] w-full object-cover object-top"
            />
          </div>
        </Reveal>

        <Reveal className="min-w-0 space-y-5 text-base leading-relaxed sm:text-lg">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
            Professional Summary
          </p>
          <p>
            A Computer Science and Engineering graduate from Green University of Bangladesh (2024),
            I work with Python, Django, data science, machine learning and Power BI. I&apos;m focused
            on building responsive, accessible web interfaces and data-driven software.
          </p>
        </Reveal>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map(({ icon: Icon, title, text }, index) => (
          <Reveal as="li" key={title} delay={index * 0.08} className="card card-hover flex h-full gap-4">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
            >
              <Icon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white">{title}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
