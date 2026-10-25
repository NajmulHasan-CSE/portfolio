import {
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  House,
  Mail,
  Route,
  UserRound,
  Wrench,
} from 'lucide-react';

/** Standalone portfolio pages linked from the navbar and footer. */
export const navLinks = [
  {
    path: '/',
    label: 'Home',
    description: 'Welcome and a quick introduction.',
    icon: House,
  },
  {
    path: '/about',
    label: 'About',
    description: 'Learn about me and how I approach my work.',
    icon: UserRound,
  },
  {
    path: '/skills',
    label: 'Skills',
    description: 'Explore my frontend and development skills.',
    icon: Code2,
  },
  {
    path: '/projects',
    label: 'Projects',
    description: 'See the projects I have worked on.',
    icon: BriefcaseBusiness,
  },
  {
    path: '/career-journey',
    label: 'Career Journey',
    description: 'Follow my learning and career journey.',
    icon: Route,
  },
  {
    path: '/services',
    label: 'Services',
    description: 'See the frontend work I can take on.',
    icon: Wrench,
  },
  {
    path: '/education',
    label: 'Education',
    description: 'View my education, academic projects and internship experience.',
    icon: GraduationCap,
  },
  {
    path: '/contact',
    label: 'Contact',
    description: 'Get in touch with me.',
    icon: Mail,
  },
];
