import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, MessageCircle, Send } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import ContactForm from '@/components/ContactForm';

gsap.registerPlugin(ScrollTrigger);

export default function ContactSection() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLDivElement>(null);

  const email = 'hassan0deghedy@gmail.com';

  const contactItems = [
    { icon: Mail, label: t('contact.info.email.label'), value: email, href: `mailto:${email}` },
    { icon: Phone, label: t('contact.info.phone.label'), value: t('contact.info.phone.value'), href: `tel:${t('contact.info.phone.value').replace(/\s/g, '')}` },
    { icon: MapPin, label: t('contact.info.location.label'), value: t('contact.info.location.value'), href: '#' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', href: 'https://github.com/lacrous' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/lacrous' },
    { icon: MessageCircle, label: 'WhatsApp', href: '#' },
    { icon: Send, label: 'Telegram', href: 'https://t.me/lacrous' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-left > *',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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
        '.contact-right',
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
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
      id="contact"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--bg-primary)',
      }}
    >
      <div className="container-main">
        <SectionTitle title={t('contact.title')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Contact Info */}
          <div className="contact-left space-y-8">
            <div>
              <h3
                className="text-xl font-semibold mb-3"
                style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
              >
                {t('contact.subtitle')}
              </h3>
              <p
                className="text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
              >
                {t('contact.description')}
              </p>
            </div>

            {/* Contact Items */}
            <div className="space-y-5">
              {contactItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 group"
                >
                  <span className="icon-box icon-box-sm gradient-primary transition-transform group-hover:scale-110">
                    <item.icon size={20} color="white" />
                  </span>
                  <div>
                    <h4
                      className="text-sm font-semibold"
                      style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
                    >
                      {item.label}
                    </h4>
                    <p
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h4
                className="text-sm font-semibold mb-4 uppercase tracking-wide"
                style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}
              >
                Social
              </h4>
              <div className="flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="icon-box transition-all hover:scale-110 hover:-translate-y-1"
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                    }}
                    aria-label={link.label}
                  >
                    <link.icon size={20} color="white" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
