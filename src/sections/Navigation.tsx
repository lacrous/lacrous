import { useState, useEffect, useCallback } from 'react';
import { Menu, Globe, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useScroll } from '@/hooks/useScroll';
import MobileMenu from '@/components/MobileMenu';

const navItems = ['home', 'about', 'ecosystem', 'skills', 'projects', 'contact'];

export default function Navigation() {
  const { t } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, isDropdownOpen, toggleDropdown, closeDropdown } = useLanguage();
  const { isScrolled } = useScroll(50);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Scroll spy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = () => closeDropdown();
    if (isDropdownOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isDropdownOpen, closeDropdown]);

  const scrollTo = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <>
      <header
        className="nav-header fixed top-0 left-0 right-0 z-50"
        style={{
          backgroundColor: isScrolled
            ? 'rgba(15, 23, 42, 0.9)'
            : 'rgba(15, 23, 42, 0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(148, 163, 184, 0.1)',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
          height: '72px',
        }}
      >
        <div className="container-main h-full flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('home');
            }}
            className="text-xl font-extrabold tracking-tight"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            <span className="logo-light" style={{ color: 'var(--text-primary)' }}>Hassan</span>
            <span className="logo-accent" style={{ color: 'var(--color-primary)' }}> El-Deghidy</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item);
                }}
                className={`nav-link relative text-sm font-medium py-2 transition-colors ${activeSection === item ? 'active' : ''}`}
                style={{
                  color:
                    activeSection === item
                      ? 'var(--text-primary)'
                      : 'var(--text-secondary)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                {t(`nav.${item}`)}
                <span
                  className="absolute bottom-0 left-0 h-0.5 rounded-full transition-all duration-300"
                  style={{
                    width: activeSection === item ? '100%' : '0%',
                    background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
                  }}
                />
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDropdown();
                }}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: 'var(--text-secondary)',
                  backgroundColor: 'rgba(59, 130, 246, 0.08)',
                  border: '1px solid rgba(59, 130, 246, 0.2)',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                <Globe size={16} />
                <span className="uppercase">{language}</span>
                <ChevronDown
                  size={14}
                  style={{
                    transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </button>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div
                  className="absolute top-full right-0 mt-2 py-1 rounded-lg z-50 min-w-[120px]"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--card-border)',
                    boxShadow: 'var(--shadow-elevated)',
                  }}
                >
                  {(['en', 'ar', 'ru'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className="w-full text-left px-4 py-2 text-sm transition-colors"
                      style={{
                        color:
                          language === lang
                            ? 'var(--color-primary)'
                            : 'var(--text-secondary)',
                        backgroundColor:
                          language === lang
                            ? 'rgba(59, 130, 246, 0.1)'
                            : 'transparent',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {t(`language.${lang}`)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle - Desktop */}
            <button
              onClick={toggleTheme}
              className="hidden lg:flex items-center justify-center p-2 rounded-lg transition-colors"
              style={{
                color: 'var(--text-secondary)',
                backgroundColor: 'rgba(59, 130, 246, 0.08)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg"
              style={{ color: 'var(--text-primary)' }}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        activeSection={activeSection}
        onNavigate={scrollTo}
      />
    </>
  );
}
