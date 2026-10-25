import {
  Briefcase,
  Code2,
  Component,
  LayoutDashboard,
  LayoutTemplate,
  Plug,
} from 'lucide-react';

/** Types of frontend work, described without claiming commercial services. */
export const services = [
  {
    title: 'Responsive landing pages',
    description:
      'Clean, mobile-first pages with clear structure, readable typography and purposeful calls to action.',
    icon: LayoutTemplate,
  },
  {
    title: 'Business websites',
    description:
      'Multi-section informational sites built with semantic HTML, accessible navigation and fast loading in mind.',
    icon: Briefcase,
  },
  {
    title: 'React-based interfaces',
    description:
      'Component-driven interfaces with React, organised so they stay easy to read, change and extend.',
    icon: Code2,
  },
  {
    title: 'Reusable UI components',
    description:
      'Buttons, cards, forms and layout pieces that stay consistent and can be reused across pages.',
    icon: Component,
  },
  {
    title: 'Dashboard layouts',
    description:
      'Responsive layouts for presenting data, with sidebars, cards and tables that adapt to screen size.',
    icon: LayoutDashboard,
  },
  {
    title: 'API-integrated frontends',
    description:
      'Frontends that fetch and display data from REST APIs, including loading and error states.',
    icon: Plug,
  },
];
