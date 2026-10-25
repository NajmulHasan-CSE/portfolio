import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { journey } from '../data/journey';

export default function CareerJourney() {
  return (
    <Section id="journey" labelledBy="journey-title">
      <SectionHeading
        id="journey-title"
        eyebrow="Career Journey"
        title="Where I am and where I'm heading"
        description="A roadmap from frontend development to full-stack engineering and AI/ML."
      />

      <ol className="relative ml-5 space-y-10 border-l-2 border-dashed border-slate-300 sm:ml-6 dark:border-white/20">
        {journey.map((stage, index) => {
          const Icon = stage.icon;
          const isCurrent = index === 0;
          return (
            <Reveal as="li" key={stage.id} className="relative pl-8 sm:pl-12">
              <span
                aria-hidden="true"
                className={`absolute -left-[22px] top-0 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  isCurrent
                    ? 'border-transparent bg-gradient-to-br from-sky-600 to-blue-600 text-white shadow-glow'
                    : 'border-sky-400 bg-slate-50 text-sky-700 dark:border-sky-400/60 dark:bg-navy-950 dark:text-sky-300'
                }`}
              >
                <Icon className="h-5 w-5" />
              </span>

              <div className="card">
                <p className="text-xs font-semibold uppercase tracking-widest text-sky-700 dark:text-sky-300">
                  {stage.badge}
                </p>
                <h3 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">{stage.title}</h3>

                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${stage.title} topics`}>
                  {stage.topics.map((topic) => (
                    <li key={topic} className="chip">
                      {topic}
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-sm">
                  <span className="font-semibold text-slate-900 dark:text-white">{stage.goalLabel}:</span>{' '}
                  {stage.goal}
                </p>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </Section>
  );
}
