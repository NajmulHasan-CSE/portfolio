import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';
import { skillCategories } from '../data/skills';

export default function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading
        id="skills-title"
        eyebrow="Skills"
        title="Skills & Expertise"
        description="Core technical skills, frameworks, and languages used in modern software and web development."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {skillCategories.map((category, index) => (
          <Reveal key={category.id} delay={index * 0.08} className="h-full">
            <SkillCard category={category} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
