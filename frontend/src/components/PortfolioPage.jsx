'use client';

import PageDirectory from './PageDirectory';
import About from '../portfolio-pages/About';
import CareerJourney from '../portfolio-pages/CareerJourney';
import Contact from '../portfolio-pages/Contact';
import Education from '../portfolio-pages/Education';
import Hero from '../portfolio-pages/Hero';
import Links from '../portfolio-pages/Links';
import Projects from '../portfolio-pages/Projects';
import Services from '../portfolio-pages/Services';
import Skills from '../portfolio-pages/Skills';

const pages = {
  about: About,
  'career-journey': CareerJourney,
  contact: Contact,
  education: Education,
  home: Hero,
  links: Links,
  projects: Projects,
  services: Services,
  skills: Skills,
};

export default function PortfolioPage({ page }) {
  const Page = pages[page];

  if (!Page) return null;

  return (
    <>
      <Page />
      {page === 'home' && <PageDirectory />}
    </>
  );
}
