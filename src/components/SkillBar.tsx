import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface SkillBarProps {
  name: string;
  percentage: number;
}

export default function SkillBar({ name, percentage }: SkillBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isRTL = language === 'ar';

  useEffect(() => {
    if (!fillRef.current || !barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fillRef.current,
        { width: '0%' },
        {
          width: `${percentage}%`,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: barRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [percentage]);

  return (
    <div ref={barRef} className="mb-5" style={{ direction: 'ltr' }}>
      <div className="flex justify-between items-center mb-2">
        <span
          className="text-sm font-semibold"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)' }}
        >
          {name}
        </span>
        <span
          className="text-sm font-medium"
          style={{
            color: 'var(--text-secondary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
          }}
        >
          {percentage}%
        </span>
      </div>
      <div
        className="relative overflow-hidden"
        style={{
          height: 'var(--skill-bar-height)',
          backgroundColor: 'rgba(148, 163, 184, 0.15)',
          borderRadius: 'var(--skill-bar-radius)',
        }}
      >
        <div
          ref={fillRef}
          className="relative h-full"
          style={{
            width: '0%',
            background: isRTL
              ? 'linear-gradient(270deg, #3b82f6, #06b6d4)'
              : 'linear-gradient(90deg, #3b82f6, #06b6d4)',
            borderRadius: 'var(--skill-bar-radius)',
            marginLeft: isRTL ? 'auto' : '0',
            marginRight: isRTL ? '0' : 'auto',
          }}
        >
          {/* Shimmer effect */}
          <div
            className="absolute top-0 h-full animate-shimmer"
            style={{
              width: '60px',
              background:
                'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
