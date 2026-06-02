import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from 'react-i18next';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        setDisplayValue(Math.round(obj.val));
      },
    });
  }, [inView, value]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const stats: StatItem[] = [
    { value: 100, suffix: '+', label: t('stats.projects', 'Projects Completed') },
    { value: 4, suffix: '+', label: t('stats.years', 'Years Experience') },
    { value: 50, suffix: '+', label: t('stats.clients', 'Happy Clients') },
    { value: 6, suffix: '', label: t('stats.products', 'Ecosystem Products') },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 80%',
        once: true,
        onEnter: () => setInView(true),
      });

      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(139,92,246,0.08))',
        borderTop: '1px solid var(--card-border)',
        borderBottom: '1px solid var(--card-border)',
      }}
    >
      <div className="container-main">
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-2 gradient-text"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p
                className="text-sm sm:text-base font-medium"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
