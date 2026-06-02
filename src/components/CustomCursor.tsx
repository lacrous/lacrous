import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(isTouchDevice);
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!cursor || !dot || !ring) return;

    // Mouse move - dot follows instantly, ring follows with delay
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'none',
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      });
    };

    // Hover effects on interactive elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('glass-card') ||
        target.closest('.glass-card')
      ) {
        setIsHovering(true);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('glass-card') ||
        target.closest('.glass-card')
      ) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  // Don't render on touch devices
  if (isTouch) return null;

  return (
    <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[9999] hidden lg:block">
      {/* Outer glow ring */}
      <div
        ref={cursorRingRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200"
        style={{
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          border: `1.5px solid ${isHovering ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.3)'}`,
          boxShadow: isHovering
            ? '0 0 20px rgba(59, 130, 246, 0.3), inset 0 0 10px rgba(59, 130, 246, 0.1)'
            : '0 0 10px rgba(59, 130, 246, 0.15)',
          mixBlendMode: 'screen',
        }}
      />
      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: isHovering ? 'rgba(59, 130, 246, 0.9)' : 'rgba(248, 250, 252, 0.8)',
          boxShadow: isHovering
            ? '0 0 12px rgba(59, 130, 246, 0.6)'
            : '0 0 8px rgba(248, 250, 252, 0.4)',
          transition: 'background-color 0.2s, box-shadow 0.2s, width 0.2s, height 0.2s',
        }}
      />
    </div>
  );
}
