import { Mail, Phone } from 'lucide-react';
import ContactForm from '../components/ContactForm';
import Reveal from '../components/Reveal';
import Section from '../components/Section';
import SectionHeading from '../components/SectionHeading';
import SocialQrCard from '../components/SocialQrCard';
import { GitHubIcon, LinkedInIcon } from '../components/icons';
import { getContactDisplayValue, getContactLinks } from '../utils/config';

const icons = { email: Mail, mobile: Phone, github: GitHubIcon, linkedin: LinkedInIcon };

function ContactCard({ item }) {
  const Icon = icons[item.id];
  const iconBox =
    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-600 to-blue-600 text-white';

  const external = item.id !== 'email' ? { target: '_blank', rel: 'noopener noreferrer' } : {};

  return (
    <a href={item.href} className="card card-hover flex items-center gap-4" {...external}>
      <span aria-hidden="true" className={iconBox}>
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-semibold text-slate-900 dark:text-white">{item.label}</p>
        <p className="text-sm text-slate-600 dark:text-slate-300">{getContactDisplayValue(item)}</p>
      </div>
    </a>
  );
}

export default function Contact() {
  return (
    <Section id="contact" labelledBy="contact-title" className="bg-white/60 dark:bg-white/[0.02]">
      <SectionHeading
        id="contact-title"
        eyebrow="Contact"
        title="Let's talk"
        description="I am open to full-time junior frontend roles and professional inquiries."
      />

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-5">
        <div className="order-2 min-w-0 space-y-6 lg:order-1 lg:col-span-2">
          <ul className="space-y-4">
            {getContactLinks()
              .filter((item) => item.configured)
              .map((item, index) => (
                <Reveal as="li" key={item.id} delay={index * 0.08}>
                  <ContactCard item={item} />
                </Reveal>
              ))}
          </ul>
        </div>

        <Reveal className="order-1 lg:order-2 lg:col-span-3">
          <ContactForm />
        </Reveal>
      </div>

      <div className="mt-10">
        <SocialQrCard featured />
      </div>
    </Section>
  );
}
