import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { services } from '../data/services';

export default function Services() {
  return (
    <Section id="services" labelledBy="services-title" className="bg-white/60 dark:bg-white/[0.02]">
      <SectionHeading
        id="services-title"
        eyebrow="What I can build"
        title="Frontend work I can take on"
        description="Frontend services built around responsive design and maintainable code."
      />

      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, description, icon: Icon }, index) => (
          <Reveal as="li" key={title} delay={(index % 3) * 0.08} className="card card-hover">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
