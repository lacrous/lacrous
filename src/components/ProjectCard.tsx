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
  projectUrl?: string;
  codeUrl?: string;
}

export default function ProjectCard({
  title,
  description,
  status,
  tags,
}: ProjectCardProps) {
  const { t } = useTranslation();
  const statusClass = status === 'in_dev' ? 'status-dev' : 'status-completed';
  const statusText = status === 'in_dev' ? t('projects.status.in_dev') : t('projects.status.completed');

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

      {/* Image Placeholder */}
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
        <button className="btn-primary text-sm" disabled={status === 'in_dev'}>
          <ExternalLink size={16} />
          {t('projects.cta_view')}
        </button>
        <button className="btn-secondary text-sm">
          <Github size={16} />
          {t('projects.cta_code')}
        </button>
      </div>
    </div>
  );
}
