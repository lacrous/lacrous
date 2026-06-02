import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface FloatingPhotosProps {
  photo1: string;
  photo2: string;
}

export default function FloatingPhotos({ photo1, photo2 }: FloatingPhotosProps) {
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!card1Ref.current || !card2Ref.current) return;

    // Floating animation for card 1
    gsap.to(card1Ref.current, {
      y: -12,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    });

    // Floating animation for card 2 (delayed)
    gsap.to(card2Ref.current, {
      y: -10,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 0.8,
    });

    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.fromTo(
        card1Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 0.8 }
      );
      gsap.fromTo(
        card2Ref.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: 'power3.out', delay: 1.1 }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ===== MOBILE: One photo left, one photo right of text ===== */}
      <div className="flex lg:hidden items-center justify-center gap-4 mb-6 w-full">
        {/* Photo 1 - Left */}
        <div
          ref={card1Ref}
          className="relative flex-shrink-0"
          style={{
            width: '100px',
            transform: 'rotate(-6deg)',
          }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 4px 20px rgba(59, 130, 246, 0.2)',
            }}
          >
            <img
              src={photo1}
              alt="Hassan El-Deghidy"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '1/1' }}
              loading="eager"
            />
          </div>
        </div>

        {/* Photo 2 - Right */}
        <div
          ref={card2Ref}
          className="relative flex-shrink-0"
          style={{
            width: '100px',
            transform: 'rotate(4deg) translateY(10px)',
          }}
        >
          <div
            className="rounded-xl overflow-hidden"
            style={{
              border: '2px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 4px 20px rgba(139, 92, 246, 0.2)',
            }}
          >
            <img
              src={photo2}
              alt="Hassan El-Deghidy"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '1/1' }}
              loading="eager"
            />
          </div>
        </div>
      </div>

      {/* ===== DESKTOP: Photos beside text (as before) ===== */}
      <div className="hidden lg:flex items-center justify-center gap-6 flex-shrink-0">
        {/* Photo Card 1 */}
        <div
          className="relative"
          style={{
            width: '180px',
            transform: 'rotate(-6deg)',
            zIndex: 2,
          }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
            }}
          >
            <img
              src={photo1}
              alt="Hassan El-Deghidy"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '1/1' }}
              loading="eager"
            />
          </div>
          <div
            className="absolute -inset-3 rounded-3xl -z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(139,92,246,0.15))',
              filter: 'blur(20px)',
            }}
          />
        </div>

        {/* Photo Card 2 */}
        <div
          className="relative"
          style={{
            width: '160px',
            transform: 'rotate(4deg) translateY(30px)',
            zIndex: 1,
          }}
        >
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: '2px solid rgba(139, 92, 246, 0.3)',
              boxShadow: '0 8px 32px rgba(139, 92, 246, 0.2)',
            }}
          >
            <img
              src={photo2}
              alt="Hassan El-Deghidy"
              className="w-full h-auto object-cover"
              style={{ aspectRatio: '1/1' }}
              loading="eager"
            />
          </div>
          <div
            className="absolute -inset-3 rounded-3xl -z-10"
            style={{
              background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(6,182,212,0.15))',
              filter: 'blur(20px)',
            }}
          />
        </div>
      </div>
    </>
  );
}
