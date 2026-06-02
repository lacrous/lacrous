import { useTranslation } from 'react-i18next';
import { Github, Linkedin, MessageCircle, Send } from 'lucide-react';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/lacrous' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/lacrous' },
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
  { icon: Send, label: 'Telegram', href: 'https://t.me/lacrous' },
];

const navItems = ['home', 'about', 'ecosystem', 'skills', 'projects', 'contact'];

export default function Footer() {
  const { t } = useTranslation();

  const scrollTo = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer
      className="footer-section"
      style={{
        backgroundColor: 'var(--color-darker)',
        borderTop: '1px solid rgba(148, 163, 184, 0.1)',
        padding: '60px 0 40px',
        transition: 'background-color 0.3s ease',
      }}
    >
      <div className="container-main text-center">
        {/* Logo */}
        <h3
          className="text-xl font-extrabold mb-3"
          style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
        >
          Hassan El-Deghidy
        </h3>

        {/* Title */}
        <p
          className="text-sm font-medium mb-2"
          style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
        >
          {t('footer.title')}
        </p>

        {/* Tagline */}
        <p
          className="text-sm mb-6"
          style={{ color: 'var(--text-secondary)', opacity: 0.7, fontFamily: 'var(--font-sans)' }}
        >
          {t('footer.tagline')}
        </p>

        {/* Nav Links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-6">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(item);
              }}
              className="text-sm font-medium transition-colors hover:text-[var(--color-primary)]"
              style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}
            >
              {t(`nav.${item}`)}
            </a>
          ))}
        </nav>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="icon-box transition-all hover:scale-110 hover:-translate-y-1"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              }}
              aria-label={link.label}
            >
              <link.icon size={16} color="white" />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <p
          className="text-xs"
          style={{ color: 'var(--text-secondary)', opacity: 0.5, fontFamily: 'var(--font-sans)' }}
        >
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
}
