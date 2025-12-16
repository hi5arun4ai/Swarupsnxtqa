import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PhoneDemo from './components/PhoneDemo';
import VoiceStudio from './components/VoiceStudio';
import Solutions from './components/Solutions';
import Industries from './components/Industries';
import ROICalculator from './components/ROICalculator';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DemoModal from './components/DemoModal';
import FAQ from './components/FAQ';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize theme based on preference or system
  useEffect(() => {
    try {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn("LocalStorage access denied", e);
      // Fallback to default (light) or check media query only if safe
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setIsDarkMode(true);
         document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    try {
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        setIsDarkMode(true);
      }
    } catch (e) {
      console.warn("LocalStorage unavailable", e);
      // Still toggle visual state even if storage fails
      if (isDarkMode) {
        document.documentElement.classList.remove('dark');
        setIsDarkMode(false);
      } else {
        document.documentElement.classList.add('dark');
        setIsDarkMode(true);
      }
    }
  };

  const openDemoModal = () => setIsModalOpen(true);
  const closeDemoModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-accent-500 selection:text-white">
      {/* Background Gradients for global ambience */}
      <div className="fixed inset-0 z-[-1] pointer-events-none">
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-900/10 dark:bg-brand-800/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000"></div>
      </div>

      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main>
        <section id="hero" className="scroll-mt-28">
          <Hero />
        </section>

        <section id="voice-studio" className="py-20 scroll-mt-28">
          <VoiceStudio />
        </section>

        <section id="demo" className="py-20 md:py-28 scroll-mt-28">
          <PhoneDemo openModal={openDemoModal} />
        </section>

        <section id="solutions" className="py-20 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm scroll-mt-28">
          <Solutions />
        </section>

        <section id="why-us" className="py-20 scroll-mt-28">
          <WhyUs />
        </section>

        <section id="industries" className="py-20 scroll-mt-28">
          <Industries />
        </section>

        <section id="roi" className="py-20 bg-brand-50 dark:bg-slate-800/50 scroll-mt-28">
          <ROICalculator />
        </section>

        <section id="faq" className="py-20 scroll-mt-28">
          <FAQ />
        </section>

        <section id="contact" className="py-24 relative overflow-hidden scroll-mt-28">
           {/* Decorative Blobs for Contact Section */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-tr from-accent-500/10 to-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
           <div className="relative z-10">
             <Contact />
           </div>
        </section>
      </main>

      <Footer />
      
      <DemoModal isOpen={isModalOpen} onClose={closeDemoModal} />
    </div>
  );
};

export default App;