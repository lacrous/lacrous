import { type LucideIcon } from 'lucide-react';

interface AchievementCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export default function AchievementCard({ icon: Icon, title, description }: AchievementCardProps) {
  return (
    <div
      className="glass-card text-center"
      style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
    >
      <div
        className="icon-box icon-box-lg mx-auto mb-4 gradient-primary"
        style={{ borderRadius: '50%' }}
      >
        <Icon size={28} color="white" />
      </div>
      <h4
        className="text-base font-semibold mb-2"
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
