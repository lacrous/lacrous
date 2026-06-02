import { Sun, Moon, ArrowUp } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useScroll } from '@/hooks/useScroll';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function FloatingActions() {
  const { theme, toggleTheme } = useTheme();
  const { isScrolled } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <>
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center rounded-full"
        style={{
          width: '56px',
          height: '56px',
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          boxShadow: '0 4px 20px rgba(59, 130, 246, 0.4)',
          border: 'none',
          cursor: 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          if (!prefersReducedMotion) {
            e.currentTarget.style.transform = 'scale(1.1) rotate(15deg)';
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1) rotate(0deg)';
        }}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <Sun size={22} color="white" />
        ) : (
          <Moon size={22} color="white" />
        )}
      </button>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-40 flex items-center justify-center rounded-full"
        style={{
          width: '48px',
          height: '48px',
          backgroundColor: 'var(--color-primary)',
          border: 'none',
          cursor: 'pointer',
          opacity: isScrolled ? 1 : 0,
          transform: isScrolled ? 'translateY(0)' : 'translateY(20px)',
          pointerEvents: isScrolled ? 'auto' : 'none',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          boxShadow: '0 4px 16px rgba(59, 130, 246, 0.3)',
        }}
        aria-label="Back to top"
      >
        <ArrowUp size={20} color="white" />
      </button>
    </>
  );
}
