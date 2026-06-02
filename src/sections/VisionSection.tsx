import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import GlassCard from '@/components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

export default function VisionSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.vision-card',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.vision-name',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
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
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('vision.title')} />

        <div className="max-w-3xl mx-auto text-center">
          {/* Quote Card */}
          <div className="vision-card">
            <GlassCard className="relative">
              {/* Decorative quote marks */}
              <span
                className="absolute top-4 left-6 text-8xl font-serif leading-none select-none pointer-events-none"
                style={{ color: 'var(--color-primary)', opacity: 0.15 }}
              >
                &ldquo;
              </span>
              <span
                className="absolute bottom-0 right-6 text-8xl font-serif leading-none select-none pointer-events-none"
                style={{ color: 'var(--color-primary)', opacity: 0.15 }}
              >
                &rdquo;
              </span>

              <p
                className="text-lg sm:text-xl lg:text-2xl leading-relaxed relative z-10"
                style={{
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  lineHeight: 1.7,
                }}
              >
                {t('vision.quote')}
              </p>
            </GlassCard>
          </div>

          {/* Ecosystem Name */}
          <div className="vision-name mt-10">
            <p
              className="text-sm sm:text-base mb-3"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              {t('vision.label')}
            </p>
            <h3
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              {t('vision.ecosystem_name')}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
