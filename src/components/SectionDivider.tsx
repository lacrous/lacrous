interface SectionDividerProps {
  variant?: 'wave' | 'curve' | 'slant';
  flip?: boolean;
}

export default function SectionDivider({ variant = 'wave', flip = false }: SectionDividerProps) {
  const fillColor = 'var(--bg-primary)';

  if (variant === 'wave') {
    return (
      <div
        className="w-full overflow-hidden leading-none"
        style={{
          transform: flip ? 'rotate(180deg)' : 'none',
          marginTop: flip ? '-1px' : '-1px',
          marginBottom: flip ? '-1px' : '-1px',
        }}
      >
        <svg
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="w-full h-8 sm:h-12 lg:h-16 block"
        >
          <path
            d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
            fill={fillColor}
            opacity="0.5"
          />
          <path
            d="M0,40 C300,10 500,50 800,25 C1000,10 1100,45 1200,35 L1200,60 L0,60 Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }

  if (variant === 'curve') {
    return (
      <div
        className="w-full overflow-hidden leading-none"
        style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
      >
        <svg
          viewBox="0 0 1200 80"
          preserveAspectRatio="none"
          className="w-full h-10 sm:h-14 lg:h-20 block"
        >
          <path
            d="M0,0 L0,40 Q600,80 1200,40 L1200,0 Z"
            fill={fillColor}
          />
        </svg>
      </div>
    );
  }

  // Slant variant
  return (
    <div
      className="w-full overflow-hidden leading-none"
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
    >
      <svg
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
        className="w-full h-6 sm:h-8 lg:h-10 block"
      >
        <polygon points="0,40 1200,0 1200,40 0,40" fill={fillColor} />
      </svg>
    </div>
  );
}
