import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const tl = gsap.timeline();

    tl.to(
      { val: 0 },
      {
        val: 100,
        duration: 1.8,
        ease: 'power2.inOut',
        onUpdate: function () {
          setProgress(Math.round(this.targets()[0].val));
        },
      }
    );

    tl.call(() => {
      setIsExiting(true);
      setTimeout(onComplete, 800);
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
      style={{
        backgroundColor: '#0f172a',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'scale(1.1)' : 'scale(1)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
    >
      {/* Logo */}
      <div className="mb-8">
        <h1
          className="text-2xl sm:text-3xl font-extrabold tracking-tight"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          <span style={{ color: '#f8fafc' }}>Hassan</span>
          <span style={{ color: '#3b82f6' }}> El-Deghidy</span>
        </h1>
      </div>

      {/* Progress bar container */}
      <div
        className="w-64 sm:w-80 h-1 rounded-full overflow-hidden mb-4"
        style={{ backgroundColor: 'rgba(148, 163, 184, 0.15)' }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)',
            transition: 'width 0.1s ease',
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.4)',
          }}
        />
      </div>

      {/* Progress text */}
      <div className="flex items-center gap-2">
        <span
          className="text-sm font-medium"
          style={{
            color: '#94a3b8',
            fontFamily: 'var(--font-mono)',
          }}
        >
          Loading
        </span>
        <span
          className="text-sm font-bold w-10 text-right"
          style={{
            color: '#3b82f6',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {progress}%
        </span>
      </div>

      {/* Tagline */}
      <p
        className="mt-6 text-xs tracking-widest uppercase"
        style={{ color: 'rgba(148, 163, 184, 0.5)', fontFamily: 'var(--font-mono)' }}
      >
        Building ecosystems
      </p>
    </div>
  );
}
