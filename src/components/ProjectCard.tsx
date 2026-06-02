import { ExternalLink, Github, LayoutTemplate } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface TechTag {
  name: string;
  color: string;
}

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  tags: TechTag[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  status,
  tags,
  image,
  githubUrl,
  liveUrl,
}: ProjectCardProps) {
  const { t } = useTranslation();
  const statusClass = status === 'in_dev' ? 'status-dev' : 'status-completed';
  const statusText = status === 'in_dev' ? t('projects.status.in_dev') : t('projects.status.completed');
  const hasLiveLink = liveUrl && liveUrl !== '#';
  const hasGithubLink = githubUrl && githubUrl !== '#';

  return (
    <div className="glass-card glass-card-hover">
      {/* Status Badge */}
      <span className={`status-badge ${statusClass} mb-4`}>{statusText}</span>

      {/* Title */}
      <h3
        className="text-xl font-semibold mb-3"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
      >
        {title}
      </h3>

      {/* Image */}
      {image ? (
        <div
          className="mb-4 overflow-hidden"
          style={{
            height: '200px',
            borderRadius: '16px',
            border: '1px solid var(--card-border)',
          }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
              const parent = (e.target as HTMLImageElement).parentElement;
              if (parent) {
                parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(30,41,59,0.8),rgba(15,23,42,0.8));"><svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.3)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg></div>`;
              }
            }}
          />
        </div>
      ) : (
        /* Fallback placeholder */
        <div
          className="mb-4 flex items-center justify-center"
          style={{
            height: '200px',
            borderRadius: '16px',
            background:
              status === 'in_dev'
                ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))'
                : 'linear-gradient(135deg, rgba(30,41,59,0.8), rgba(15,23,42,0.8))',
            border: '1px solid var(--card-border)',
          }}
        >
          <LayoutTemplate
            size={64}
            style={{
              color:
                status === 'in_dev'
                  ? 'rgba(59,130,246,0.5)'
                  : 'rgba(148,163,184,0.3)',
            }}
          />
        </div>
      )}

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
      >
        {description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag.name}
            className="tech-tag"
            style={{
              backgroundColor: `${tag.color}20`,
              color: tag.color,
              border: `1px solid ${tag.color}40`,
            }}
          >
            {tag.name}
          </span>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 flex-wrap">
        {hasLiveLink ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-sm"
          >
            <ExternalLink size={16} />
            {t('projects.cta_view')}
          </a>
        ) : (
          <button className="btn-primary text-sm" disabled>
            <ExternalLink size={16} />
            {t('projects.cta_view')}
          </button>
        )}

        {hasGithubLink ? (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-sm"
          >
            <Github size={16} />
            {t('projects.cta_code')}
          </a>
        ) : (
          <button className="btn-secondary text-sm" disabled>
            <Github size={16} />
            {t('projects.cta_code')}
          </button>
        )}
      </div>
    </div>
  );
}
