import { type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface EcosystemCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  status?: string;
}

const gradientMap: Record<string, string> = {
  blue: 'linear-gradient(135deg, #3b82f6, #2563eb)',
  purple: 'linear-gradient(135deg, #8b5cf6, #a78bfa)',
  cyan: 'linear-gradient(135deg, #06b6d4, #22d3ee)',
  rose: 'linear-gradient(135deg, #f43f5e, #fb7185)',
  emerald: 'linear-gradient(135deg, #10b981, #34d399)',
  amber: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
};

export default function EcosystemCard({
  icon: Icon,
  title,
  description,
  gradient,
  status,
}: EcosystemCardProps) {
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  return (
    <div
      className={`glass-card glass-card-hover relative ${isRTL ? 'text-right' : 'text-left'}`}
    >
      {status && (
        <span className="status-badge status-active absolute top-4 right-4">
          {status}
        </span>
      )}
      <div
        className="icon-box icon-box-md mb-4"
        style={{ background: gradientMap[gradient] || gradientMap.blue }}
      >
        <Icon size={24} color="white" />
      </div>
      <h4
        className="text-lg font-semibold mb-2"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
      >
        {title}
      </h4>
      <p
        className="text-sm leading-relaxed"
        style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
      >
        {description}
      </p>
    </div>
  );
}
