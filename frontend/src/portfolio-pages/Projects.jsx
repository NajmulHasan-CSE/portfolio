import ProjectCard from '../components/ProjectCard';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <Section id="projects" labelledBy="projects-title" className="bg-white/60 dark:bg-white/[0.02]">
      <SectionHeading id="projects-title" eyebrow="Projects" title="Featured projects" />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <Reveal key={project.id} delay={(index % 2) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
