import { ExternalLink } from 'lucide-react';
import Button from './Button';
import { GitHubIcon } from './icons';
import { isConfiguredUrl } from '../utils/config';

export default function ProjectCard({ project }) {
  const hasLive = isConfiguredUrl(project.liveUrl);
  const hasRepo = isConfiguredUrl(project.repoUrl);

  return (
    <article className="card card-hover flex h-full flex-col justify-between gap-6 border-l-4 border-l-sky-500">
      <h3 className="text-lg font-bold leading-snug text-slate-900 dark:text-white sm:text-xl">
        {project.title}
      </h3>
      {(hasLive || hasRepo) && (
        <div className="flex flex-wrap gap-3">
          {hasLive && (
            <Button size="sm" icon={ExternalLink} href={project.liveUrl} external>
              Live Demo
            </Button>
          )}
          {hasRepo && (
            <Button
              size="sm"
              variant="secondary"
              icon={GitHubIcon}
              href={project.repoUrl}
              external
            >
              GitHub
            </Button>
          )}
        </div>
      )}
    </article>
  );
}
