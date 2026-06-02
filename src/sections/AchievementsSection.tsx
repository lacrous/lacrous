import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Star, FileBadge, Clock, Users, GitFork } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import AchievementCard from '@/components/AchievementCard';

gsap.registerPlugin(ScrollTrigger);

const iconMap = [Trophy, Star, FileBadge, Clock, Users, GitFork];

export default function AchievementsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const items = t('achievements.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
    icon: string;
  }>;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.achievement-card-wrapper',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1,
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
      id="achievements"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('achievements.title')} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div key={item.title} className="achievement-card-wrapper">
              <AchievementCard
                icon={iconMap[index]}
                title={item.title}
                description={item.description}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
