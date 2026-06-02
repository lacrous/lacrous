import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = ['home', 'about', 'ecosystem', 'skills', 'projects', 'contact'];

export default function MobileMenu({ isOpen, onClose, activeSection, onNavigate }: MobileMenuProps) {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstLinkRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleNav = (section: string) => {
    onNavigate(section);
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 lg:hidden"
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 bottom-0 z-50 w-80 max-w-full lg:hidden"
        style={{
          backgroundColor: 'var(--bg-primary)',
          borderLeft: '1px solid var(--card-border)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 rounded-lg"
            style={{ color: 'var(--text-secondary)' }}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="px-6 py-4" aria-label="Mobile navigation">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <li key={item}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={`#${item}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item);
                  }}
                  className="block py-3 px-4 rounded-lg text-lg font-medium transition-colors"
                  style={{
                    color:
                      activeSection === item
                        ? 'var(--color-primary)'
                        : 'var(--text-primary)',
                    backgroundColor:
                      activeSection === item
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'transparent',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {t(`nav.${item}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language indicator */}
        <div className="px-6 py-4 mt-auto border-t" style={{ borderColor: 'var(--card-border)' }}>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {t('language.label')}: <span className="font-semibold uppercase">{language}</span>
          </p>
        </div>
      </div>
    </>
  );
}
