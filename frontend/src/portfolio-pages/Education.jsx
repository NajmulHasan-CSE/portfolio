import { Award, BookOpenCheck, BriefcaseBusiness, GraduationCap } from 'lucide-react';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import { education } from '../data/education';

function Field({ label, value }) {
  if (!value) return null;

  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-slate-900 dark:text-white">{value}</dd>
    </div>
  );
}

export default function Education() {
  const entries = education.items.filter(
    (item) => item.degree || item.institution || item.graduationYear || item.coursework.length,
  );

  return (
    <Section id="education" labelledBy="education-title">
      <SectionHeading
        id="education-title"
        eyebrow="Education & Experience"
        title="Academic and professional background"
      />

      {entries.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {entries.map((item, index) => (
            <Reveal key={`${item.institution}-${index}`} className="card flex gap-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
              >
                <GraduationCap className="h-5 w-5" />
              </span>
              <dl className="space-y-4">
                <Field label="Degree" value={item.degree} />
                <Field label="Institution" value={item.institution} />
                <Field label={item.yearLabel || 'Graduation year'} value={item.graduationYear} />
                <Field label="Group" value={item.group} />
                {item.coursework.length > 0 && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                      Relevant coursework
                    </dt>
                    <dd className="mt-1">
                      <ul className="flex flex-wrap gap-2">
                        {item.coursework.map((course) => (
                          <li key={course} className="chip">
                            {course}
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                )}
              </dl>
            </Reveal>
          ))}
        </div>
      ) : (
        <p className="text-slate-600 dark:text-slate-300">Education details will be added soon.</p>
      )}

      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">Academic Projects & Thesis</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.academicProjects.map((project) => (
            <Reveal key={project.title} className="card">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
                >
                  <BookOpenCheck className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-sky-700 dark:text-sky-300">
                    {project.context}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">{project.title}</h3>
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {project.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">Internship Experience</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.internships.map((internship) => (
            <Reveal key={internship.title} className="card">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
                >
                  <BriefcaseBusiness className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{internship.title}</h3>
                  {internship.organization && (
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{internship.organization}</p>
                  )}
                  {(internship.duration || internship.employmentType) && (
                    <p className="mt-1 text-sm font-medium text-sky-700 dark:text-sky-300">
                      {[internship.duration, internship.employmentType].filter(Boolean).join(' · ')}
                    </p>
                  )}
                </div>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {internship.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-5 text-2xl font-bold text-slate-900 dark:text-white">Certifications & Training</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {education.certifications.map((certification) => (
            <Reveal key={certification.title} className="card flex items-start gap-4">
              <span
                aria-hidden="true"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white"
              >
                <Award className="h-5 w-5" />
              </span>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{certification.title}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{certification.provider}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
