import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionTitle from '@/components/SectionTitle';
import ProjectCard from '@/components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);
  const items = t('projects.items', { returnObjects: true }) as Array<{
    title: string;
    status: string;
    description: string;
    tags: Array<{ name: string; color: string }>;
  }>;

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card-wrapper',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
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
      id="projects"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('projects.title')} />

        <div className="max-w-4xl mx-auto space-y-8">
          {items.map((project) => (
            <div key={project.title} className="project-card-wrapper">
              <ProjectCard
                title={project.title}
                description={project.description}
                status={project.status}
                tags={project.tags}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
