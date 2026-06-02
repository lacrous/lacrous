interface SectionTitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SectionTitle({ title, subtitle, className = '' }: SectionTitleProps) {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2
        className="section-title"
        style={{ fontFamily: 'var(--font-mono)', marginBottom: subtitle ? '1rem' : '1.5rem' }}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className="text-lg max-w-2xl mx-auto"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
