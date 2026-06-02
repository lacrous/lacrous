import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import HeroCanvas from '@/components/HeroCanvas';
import FloatingPhotos from '@/components/FloatingPhotos';
import { PHOTOS } from '@/config/photos';

export default function HeroSection() {
  const { t } = useTranslation();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.fromTo(
        '.hero-pretitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
      )
        .fromTo(
          '.hero-name',
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-role',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo(
          '.hero-tagline',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
          '-=0.2'
        )
        .fromTo(
          '.hero-scroll',
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          '-=0.1'
        );
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const scrollToEcosystem = () => {
    document.getElementById('ecosystem')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="hero-dark relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '72px' }}
    >
      {/* 3D Background */}
      <HeroCanvas />

      {/* Dark radial overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0.1) 0%, rgba(15,23,42,0.4) 50%, rgba(15,23,42,0.65) 100%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 px-4"
        style={{ zIndex: 10, maxWidth: '1100px', width: '100%' }}
      >
        {/* Floating Photos - mobile: above text, desktop: beside text */}
        <FloatingPhotos
          photo1={PHOTOS.hero.profile1}
          photo2={PHOTOS.hero.profile2}
        />

        {/* Text Content */}
        <div className="text-center lg:text-left flex-shrink-0">
          {/* Pre-title */}
          <p
            className="hero-pretitle text-sm font-medium mb-4 tracking-wide"
            style={{
              color: '#94a3b8',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.05em',
              opacity: 0,
            }}
          >
            {t('hero.pretitle')}
          </p>

          {/* Name */}
          <h1
            className="hero-name text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4"
            style={{
              color: '#f8fafc',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.1,
              opacity: 0,
            }}
          >
            {t('hero.name')}
          </h1>

          {/* Role Badge */}
          <div
            className="hero-role inline-flex items-center px-5 py-2 rounded-full mb-6"
            style={{
              background: 'rgba(59, 130, 246, 0.15)',
              border: '1px solid rgba(59, 130, 246, 0.4)',
              opacity: 0,
            }}
          >
            <span
              className="text-sm sm:text-base font-medium"
              style={{ color: '#3b82f6', fontFamily: 'var(--font-sans)' }}
            >
              {t('hero.role')}
            </span>
          </div>

          {/* Tagline */}
          <p
            className="hero-tagline text-base sm:text-lg lg:text-xl mb-8 max-w-lg mx-auto"
            style={{
              color: '#94a3b8',
              fontFamily: 'var(--font-sans)',
              lineHeight: 1.7,
              opacity: 0,
            }}
          >
            {t('hero.tagline')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <button
              className="hero-cta btn-primary"
              onClick={scrollToEcosystem}
              style={{ opacity: 0 }}
            >
              {t('hero.cta_ecosystem')}
            </button>
            <button
              className="hero-cta btn-secondary"
              onClick={scrollToContact}
              style={{
                opacity: 0,
                color: '#f8fafc',
                borderColor: 'rgba(148, 163, 184, 0.4)',
              }}
            >
              {t('hero.cta_contact')}
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ zIndex: 10, opacity: 0 }}
      >
        <div className="relative w-0.5 h-8 overflow-hidden" style={{ backgroundColor: 'rgba(59, 130, 246, 0.2)' }}>
          <div
            className="absolute w-full animate-scroll-dot"
            style={{ height: '8px', backgroundColor: 'var(--color-primary)', borderRadius: '2px' }}
          />
        </div>
        <span
          className="text-xs font-medium uppercase tracking-widest"
          style={{ color: '#94a3b8', fontFamily: 'var(--font-mono)' }}
        >
          {t('hero.scroll')}
        </span>
        <ChevronDown size={16} style={{ color: '#3b82f6', opacity: 0.6 }} />
      </div>
    </section>
  );
}
