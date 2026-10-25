import { Code2, Layers, Sparkles } from 'lucide-react';

/** Career roadmap. These are goals, not completed achievements. */
export const journey = [
  {
    id: 'frontend',
    badge: 'Current focus',
    title: 'Frontend Development',
    icon: Code2,
    topics: [
      'HTML',
      'CSS',
      'JavaScript',
      'React',
      'Tailwind CSS',
      'Bootstrap',
      'Responsive design',
      'Git',
      'GitHub',
    ],
    goalLabel: 'Goal',
    goal: 'Qualify for a full-time Junior Frontend Developer position.',
  },
  {
    id: 'fullstack',
    badge: 'Next goal',
    title: 'Full-Stack Development',
    icon: Layers,
    topics: [
      'Python',
      'Django',
      'REST APIs',
      'Authentication',
      'SQL / PostgreSQL',
      'Backend integration',
    ],
    goalLabel: 'Target',
    goal: 'Build complete full-stack applications over the coming months.',
  },
  {
    id: 'aiml',
    badge: 'Long-term goal',
    title: 'AI / Machine Learning',
    icon: Sparkles,
    topics: [
      'Python',
      'Mathematics',
      'Statistics',
      'Data analysis',
      'NumPy',
      'Pandas',
      'Scikit-learn',
      'PyTorch (eventually)',
    ],
    goalLabel: 'Target',
    goal: 'Develop practical AI/ML projects within approximately one year, depending on progress.',
  },
];
