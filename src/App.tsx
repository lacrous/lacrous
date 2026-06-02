import { useEffect, useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { useLenis } from '@/hooks/useLenis';
import Navigation from '@/sections/Navigation';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import VisionSection from '@/sections/VisionSection';
import EcosystemSection from '@/sections/EcosystemSection';
import SkillsSection from '@/sections/SkillsSection';
import JourneySection from '@/sections/JourneySection';
import AchievementsSection from '@/sections/AchievementsSection';
import ProjectsSection from '@/sections/ProjectsSection';
import ContactSection from '@/sections/ContactSection';
import Footer from '@/sections/Footer';
import FloatingActions from '@/components/FloatingActions';
import LoadingScreen from '@/components/LoadingScreen';
import GrainOverlay from '@/components/GrainOverlay';
import StatsCounter from '@/components/StatsCounter';
import SectionDivider from '@/components/SectionDivider';
import '@/i18n';

function AppContent() {
  const [isLoading, setIsLoading] = useState(true);
  useLenis();

  useEffect(() => {
    // Set initial theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Grain Texture Overlay */}
      <GrainOverlay />

      <div
        className="min-h-screen"
        style={{
          backgroundColor: 'var(--bg-primary)',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.5s ease',
        }}
      >
        <Navigation />
        <main>
          <HeroSection />
          <SectionDivider variant="wave" />
          <AboutSection />
          <SectionDivider variant="curve" flip />
          <VisionSection />
          <SectionDivider variant="wave" />
          <EcosystemSection />
          <SectionDivider variant="curve" flip />
          <SkillsSection />
          <SectionDivider variant="slant" />
          <StatsCounter />
          <SectionDivider variant="slant" flip />
          <JourneySection />
          <SectionDivider variant="wave" />
          <AchievementsSection />
          <SectionDivider variant="curve" flip />
          <ProjectsSection />
          <SectionDivider variant="wave" />
          <ContactSection />
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
