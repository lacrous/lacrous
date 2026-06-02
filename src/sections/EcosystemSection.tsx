import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Globe2, MessageSquare, Film, HeartPulse, Clapperboard } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import EcosystemCard from '@/components/EcosystemCard';

gsap.registerPlugin(ScrollTrigger);

const iconMap = [Zap, Globe2, MessageSquare, Film, HeartPulse, Clapperboard];
const gradientMap = ['blue', 'purple', 'cyan', 'rose', 'emerald', 'amber'];

export default function EcosystemSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const products = t('ecosystem.products', { returnObjects: true }) as Array<{
    name: string;
    description: string;
    gradient: string;
  }>;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.ecosystem-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
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
      id="ecosystem"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('ecosystem.title')} subtitle={t('ecosystem.subtitle')} />

        <div className="ecosystem-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((product, index) => (
            <div key={product.name} className="ecosystem-card">
              <EcosystemCard
                icon={iconMap[index]}
                title={product.name}
                description={product.description}
                gradient={gradientMap[index]}
                status={t('ecosystem.status')}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
