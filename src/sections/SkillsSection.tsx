import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type LucideIcon, Monitor, Server, Database, Code, Target, Construction, Settings, Rocket } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import SkillBar from '@/components/SkillBar';
import GlassCard from '@/components/GlassCard';

gsap.registerPlugin(ScrollTrigger);

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Monitor,
  backend: Server,
  databases: Database,
  other: Code,
};

const focusIcons = [Target, Construction, Settings, Rocket];

export default function SkillsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const categories = t('skills.categories', { returnObjects: true }) as Record<
    string,
    { name: string; skills: Array<{ name: string; level: number }> }
  >;
  const focusItems = t('skills.focus_items', { returnObjects: true }) as string[];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-left > *',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.skills-right',
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: 'power3.out',
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
      id="skills"
      ref={sectionRef}
      className="skills-section"
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('skills.title')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Skills */}
          <div className="skills-left space-y-8">
            {Object.entries(categories).map(([key, category]) => {
              const Icon = categoryIcons[key] || Code;
              return (
                <div key={key}>
                  <h3
                    className="text-base font-semibold mb-4 flex items-center gap-3"
                    style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                  >
                    <span
                      className="icon-box icon-box-sm"
                      style={{ background: 'rgba(59, 130, 246, 0.15)' }}
                    >
                      <Icon size={20} style={{ color: 'var(--color-primary)' }} />
                    </span>
                    {category.name}
                  </h3>
                  <div className="space-y-1">
                    {category.skills.map((skill) => (
                      <SkillBar key={skill.name} name={skill.name} percentage={skill.level} />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Current Focus */}
          <div className="skills-right">
            <GlassCard>
              <h3
                className="text-lg font-semibold mb-6 flex items-center gap-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                <span
                  className="icon-box icon-box-sm"
                  style={{ background: 'rgba(59, 130, 246, 0.15)' }}
                >
                  <Target size={20} style={{ color: 'var(--color-primary)' }} />
                </span>
                {t('skills.focus_title')}
              </h3>

              <div className="space-y-5">
                {focusItems.map((item, index) => {
                  const IconComponent = focusIcons[index] || Target;
                  return (
                    <div key={item} className="flex items-start gap-4">
                      <span className="icon-box icon-box-sm flex-shrink-0 gradient-primary">
                        <IconComponent size={18} color="white" />
                      </span>
                      <div
                        className="flex-1 pl-4"
                        style={{ borderLeft: '2px solid rgba(59, 130, 246, 0.2)' }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
                        >
                          {item}
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
