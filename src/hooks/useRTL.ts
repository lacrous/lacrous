import { useState, useEffect } from 'react';

export function useRTL() {
  const [isRTL, setIsRTL] = useState(() => {
    return typeof document !== 'undefined' && document.documentElement.dir === 'rtl';
  });

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'dir') {
          setIsRTL(document.documentElement.dir === 'rtl');
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  return isRTL;
}
