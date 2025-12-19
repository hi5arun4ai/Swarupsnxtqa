import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Integrations from './components/Integrations.tsx';
import PhoneDemo from './components/PhoneDemo.tsx';
import VoiceStudio from './components/VoiceStudio.tsx';
import Solutions from './components/Solutions.tsx';
import Comparison from './components/Comparison.tsx';
import Industries from './components/Industries.tsx';
import ROICalculator from './components/ROICalculator.tsx';
import WhyUs from './components/WhyUs.tsx';
import Contact from './components/Contact.tsx';
import Footer from './components/Footer.tsx';
import DemoModal from './components/DemoModal.tsx';
import FAQ from './components/FAQ.tsx';
import GuidedTour from './components/GuidedTour.tsx';
import PrivacyProtocol from './components/PrivacyProtocol.tsx';
import SecurityTerms from './components/SecurityTerms.tsx';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setIsDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {
      console.warn("Storage access denied:", e);
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
         setIsDarkMode(true);
         document.documentElement.classList.add('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
    } catch (e) {
      console.warn("Could not save theme to localStorage:", e);
    }
  };

  const openDemoModal = () => setIsModalOpen(true);
  const closeDemoModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-accent-500 selection:text-white">
      <div className="fixed inset-0 z-[-1] pointer-events-none">
         <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent-500/10 dark:bg-accent-500/5 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob"></div>
         <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-900/10 dark:bg-brand-800/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-lighten animate-blob animation-delay-2000"></div>
      </div>

      <Navbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      
      <main>
        <section id="hero" className="scroll-mt-28">
          <Hero />
        </section>

        {/* Combined Demo Section */}
        <section id="demo" className="py-20 lg:py-32 scroll-mt-28 bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent-100 dark:bg-accent-950/40 text-accent-700 dark:text-accent-400 text-[10px] font-black uppercase tracking-[0.3em] mb-2 border border-accent-200 dark:border-accent-900/50">
                Live Interaction Center
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-black text-brand-900 dark:text-white tracking-tight">
                Experience the <span className="text-accent-500">Difference.</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-bold">
                Configure voice profiling on the left and test AI reasoning on the right. 
              </p>
            </div>
            
            <div className="flex flex-col xl:flex-row items-center justify-center gap-12 xl:gap-16">
              {/* Voice Module Component */}
              <div className="w-full xl:w-5/12 max-w-2xl">
                <VoiceStudio />
              </div>
              
              {/* Phone Demo Component */}
              <div className="w-full xl:w-5/12 flex justify-center xl:justify-end">
                <PhoneDemo openModal={openDemoModal} />
              </div>
            </div>
          </div>
        </section>

        <section id="integrations">
          <Integrations />
        </section>

        <section id="comparison" className="py-24 scroll-mt-28 bg-gray-50/50 dark:bg-slate-800/20">
          <Comparison />
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
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[600px] bg-gradient-to-tr from-accent-500/10 to-blue-600/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
           <div className="relative z-10">
             <Contact />
           </div>
        </section>
      </main>

      <Footer 
        onOpenPrivacy={() => setIsPrivacyOpen(true)} 
        onOpenSecurity={() => setIsSecurityOpen(true)}
      />
      
      <DemoModal isOpen={isModalOpen} onClose={closeDemoModal} />
      
      {/* Policy Overlays */}
      <PrivacyProtocol isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
      <SecurityTerms isOpen={isSecurityOpen} onClose={() => setIsSecurityOpen(false)} />
      
      {/* Interactive Tour Component */}
      <GuidedTour />
    </div>
  );
};

export default App;