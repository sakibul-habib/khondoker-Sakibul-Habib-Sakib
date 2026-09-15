import React, { useState } from 'react';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { BackgroundCanvas } from './components/canvas/BackgroundCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ProjectsSection } from './components/ProjectsSection';
import { GallerySection } from './components/GallerySection';
import { ThesisSection } from './components/ThesisSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { PrintResumeModal } from './components/PrintResumeModal';

function MainApp() {
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const { theme } = useTheme();

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-cyan-500 selection:text-black transition-colors duration-500">
      {/* Three.js Global 3D Interactive Background Canvas */}
      <BackgroundCanvas wireframeMode={wireframeMode} theme={theme} />

      {/* Persistent Navigation */}
      <Navbar
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        wireframeMode={wireframeMode}
        onToggleWireframe={() => setWireframeMode(!wireframeMode)}
      />

      {/* Main Content Sections with 3D Animation across each */}
      <main className="relative z-10">
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <GallerySection />
        <ThesisSection />
        <SkillsSection />
        <CertificationsSection />
        <EducationSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full Curriculum Vitae Printable Modal */}
      <PrintResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainApp />
    </ThemeProvider>
  );
}
