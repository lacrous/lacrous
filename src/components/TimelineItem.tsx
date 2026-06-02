import { useLanguage } from '@/context/LanguageContext';
import { type LucideIcon } from 'lucide-react';

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  tags: string[];
  icon: LucideIcon;
  align: 'left' | 'right';
  index: number;
}

export default function TimelineItem({
  date,
  title,
  description,
  tags,
  icon: Icon,
  align,
}: TimelineItemProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  // In RTL mode, flip the alignment so the visual zigzag pattern is mirrored
  const visualAlign = isRTL ? (align === 'left' ? 'right' : 'left') : align;
  const isLeft = visualAlign === 'left';

  return (
    <div className="relative mb-8 last:mb-0">
      {/* ===== DESKTOP (lg+): Three-column layout with center marker ===== */}
      <div className="hidden lg:flex items-start">
        {/* Left column */}
        <div className="flex-1 flex" style={{ justifyContent: 'flex-end', paddingRight: '32px' }}>
          {isLeft ? (
            <div className="glass-card" style={{ maxWidth: '380px', textAlign: isRTL ? 'right' : 'left' }}>
              <TimelineContent date={date} title={title} description={description} tags={tags} isRTL={isRTL} />
            </div>
          ) : (
            <div style={{ minHeight: '1px' }} />
          )}
        </div>

        {/* Center column: marker circle + line */}
        <div className="flex flex-col items-center flex-shrink-0" style={{ width: '44px' }}>
          <div style={{ width: '2px', height: '24px', background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))' }} />
          <div
            className="icon-box icon-box-sm gradient-primary"
            style={{ borderRadius: '50%', boxShadow: 'var(--shadow-glow-blue)', flexShrink: 0 }}
          >
            <Icon size={20} color="white" />
          </div>
          <div style={{ width: '2px', flex: '1', minHeight: '40px', background: 'linear-gradient(to bottom, var(--color-secondary), var(--color-primary))' }} />
        </div>

        {/* Right column */}
        <div className="flex-1 flex" style={{ justifyContent: 'flex-start', paddingLeft: '32px' }}>
          {!isLeft ? (
            <div className="glass-card" style={{ maxWidth: '380px', textAlign: isRTL ? 'right' : 'left' }}>
              <TimelineContent date={date} title={title} description={description} tags={tags} isRTL={isRTL} />
            </div>
          ) : (
            <div style={{ minHeight: '1px' }} />
          )}
        </div>
      </div>

      {/* ===== MOBILE (< lg): Marker left, card right (LTR) / Marker right, card left (RTL) ===== */}
      <div className="lg:hidden flex" style={{ flexDirection: isRTL ? 'row-reverse' : 'row', gap: '20px' }}>
        {/* Marker column */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className="icon-box icon-box-sm gradient-primary"
            style={{ borderRadius: '50%', boxShadow: 'var(--shadow-glow-blue)' }}
          >
            <Icon size={18} color="white" />
          </div>
          <div
            style={{
              width: '2px',
              flex: '1',
              background: 'linear-gradient(to bottom, var(--color-primary), var(--color-secondary))',
            }}
          />
        </div>

        {/* Card */}
        <div className="glass-card flex-1" style={{ marginBottom: '16px', textAlign: isRTL ? 'right' : 'left' }}>
          <TimelineContent date={date} title={title} description={description} tags={tags} isRTL={isRTL} />
        </div>
      </div>
    </div>
  );
}

/* Shared content */
function TimelineContent({
  date,
  title,
  description,
  tags,
  isRTL,
}: {
  date: string;
  title: string;
  description: string;
  tags: string[];
  isRTL: boolean;
}) {
  return (
    <div>
      <span
        className="text-sm font-medium block mb-1"
        style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}
      >
        {date}
      </span>
      <h4
        className="text-base font-semibold mb-2"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
      >
        {title}
      </h4>
      <p
        className="text-sm leading-relaxed mb-3"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
      >
        {description}
      </p>
      <div className="flex flex-wrap gap-2" style={{ justifyContent: isRTL ? 'flex-end' : 'flex-start' }}>
        {tags.map((tag) => (
          <span
            key={tag}
            className="badge-pill"
            style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.25)',
              color: 'var(--color-primary)',
              fontSize: '0.75rem',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
