import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, BookOpen, Code, Cpu } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import TimelineItem from '@/components/TimelineItem';

gsap.registerPlugin(ScrollTrigger);

const iconMap = [GraduationCap, BookOpen, Code, Cpu];

export default function JourneySection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const items = t('journey.items', { returnObjects: true }) as Array<{
    year: string;
    title: string;
    description: string;
    tags: string[];
    icon: string;
  }>;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-item-wrapper',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2,
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
      id="journey"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('journey.title')} />

        <div className="max-w-4xl mx-auto relative timeline-container">
          {/* Timeline items - wrapped for mobile vertical line */}
          <div className="relative lg:block">
            {items.map((item, index) => (
              <div key={item.year} className="timeline-item-wrapper relative z-10">
                <TimelineItem
                  date={item.year}
                  title={item.title}
                  description={item.description}
                  tags={item.tags}
                  icon={iconMap[index]}
                  align={index % 2 === 0 ? 'left' : 'right'}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
