import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, Rocket, Lightbulb, Globe } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import GlassCard from '@/components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const goalIcons = [Target, Rocket, Lightbulb, Globe];

export default function AboutSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const qualities = t('about.qualities', { returnObjects: true }) as string[];
  const goals = t('about.goals', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Left column
      gsap.fromTo(
        '.about-left > *',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Right column
      gsap.fromTo(
        '.about-right > *',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Qualities grid
      gsap.fromTo(
        '.quality-tag-item',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.qualities-grid',
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('about.title')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column */}
          <div className="about-left space-y-6">
            {/* Bio */}
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-sans)', lineHeight: 1.8 }}
            >
              {t('about.bio_primary')}
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', lineHeight: 1.8 }}
            >
              {t('about.bio_secondary')}
            </p>

            {/* Languages */}
            <div>
              <h4
                className="text-sm font-semibold mb-3 uppercase tracking-wide"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
              >
                {t('about.languages_title')}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(['arabic', 'english', 'russian'] as const).map((lang) => (
                  <span
                    key={lang}
                    className="badge-pill"
                    style={{
                      background: 'rgba(59, 130, 246, 0.1)',
                      border: '1px solid rgba(59, 130, 246, 0.25)',
                      color: 'var(--text-primary)',
                      fontSize: '0.85rem',
                    }}
                  >
                    {t(`about.languages.${lang}`)}
                  </span>
                ))}
              </div>
            </div>

            {/* Qualities */}
            <div>
              <h4
                className="text-sm font-semibold mb-3 uppercase tracking-wide"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
              >
                {t('about.qualities_title')}
              </h4>
              <div className="qualities-grid grid grid-cols-2 sm:grid-cols-3 gap-3">
                {qualities.map((quality: string) => (
                  <div key={quality} className="quality-tag-item quality-tag">
                    {quality}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Goals */}
          <div className="about-right">
            <GlassCard>
              <h3
                className="text-lg font-semibold mb-6 flex items-center gap-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                <span
                  className="icon-box icon-box-sm"
                  style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                  }}
                >
                  <Target size={20} style={{ color: 'var(--color-primary)' }} />
                </span>
                {t('about.goals_title')}
              </h3>

              <div className="space-y-5">
                {goals.map((goal, index) => {
                  const IconComponent = goalIcons[index] || Target;
                  return (
                    <div key={goal.title} className="flex items-start gap-4">
                      <span
                        className="icon-box icon-box-sm flex-shrink-0 gradient-primary"
                      >
                        <IconComponent size={20} color="white" />
                      </span>
                      <div
                        className="flex-1 pl-4"
                        style={{ borderLeft: '2px solid rgba(59, 130, 246, 0.2)' }}
                      >
                        <h4
                          className="text-sm font-semibold mb-1"
                          style={{
                            color: 'var(--text-primary)',
                            fontFamily: 'var(--font-mono)',
                          }}
                        >
                          {goal.title}
                        </h4>
                        <p
                          className="text-sm leading-relaxed"
                          style={{
                            color: 'var(--text-secondary)',
                            fontFamily: 'var(--font-sans)',
                          }}
                        >
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
}
