import React, { useState, useEffect, useRef } from 'react';

interface TourStep {
  targetId: string;
  title: string;
  content: string;
  position: 'top' | 'bottom' | 'left' | 'right' | 'center';
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'hero',
    title: 'Your Digital Workforce',
    content: 'Welcome to the future of closing. Swarups NXT deploys hyper-realistic AI agents that work 24/7 to scale your business.',
    position: 'bottom'
  },
  {
    targetId: 'voice-studio',
    title: 'Voice Studio',
    content: 'Experience the power of our neural voice engine. Customize personas, genders, and industries to hear the difference.',
    position: 'top'
  },
  {
    targetId: 'chat-bot',
    title: 'AI Reasoning',
    content: 'Test our agents logic. Interact with our chatbot to see how it handles complex queries and qualifies leads in real-time.',
    position: 'top'
  },
  {
    targetId: 'solutions',
    title: 'Our AI Ecosystem',
    content: 'From Voice Agents to AI CRMs, explore our full intelligence stack designed to automate your entire operational workflow.',
    position: 'top'
  },
  {
    targetId: 'why-us',
    title: 'The NXT Advantage',
    content: 'See why leading brands choose us for bespoke intelligence, bank-grade security, and enterprise reliability.',
    position: 'top'
  },
  {
    targetId: 'roi',
    title: 'Calculate Savings',
    content: 'Project your impact. Most enterprises reduce overhead by 40% within 30 days of implementation.',
    position: 'top'
  },
  {
    targetId: 'contact',
    title: 'Ready to Scale?',
    content: 'Our engineers are ready to architect your custom workflow. Reach out to initiate your digital transformation.',
    position: 'top'
  }
];

const GuidedTour: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(-1); // -1 means hidden
  const [spotlightRect, setSpotlightRect] = useState<{ top: number, bottom: number, left: number, right: number, width: number, height: number } | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const startTour = () => {
    setCurrentStep(0);
    localStorage.setItem('nxt_tour_completed', 'true');
  };

  useEffect(() => {
    const hasSeenTour = localStorage.getItem('nxt_tour_completed');
    if (!hasSeenTour) {
      const timer = setTimeout(() => startTour(), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const updateSpotlight = () => {
    if (currentStep >= 0 && currentStep < TOUR_STEPS.length) {
      const step = TOUR_STEPS[currentStep];
      const element = document.getElementById(step.targetId);
      if (element) {
        const rect = element.getBoundingClientRect();
        setSpotlightRect({
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height
        });
      }
    }
  };

  useEffect(() => {
    if (currentStep >= 0 && currentStep < TOUR_STEPS.length) {
      const step = TOUR_STEPS[currentStep];
      const element = document.getElementById(step.targetId);
      
      if (element) {
        // Scroll to element with offset
        const headerOffset = 120;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        // Update spotlight after a short delay for scroll
        const timer = setTimeout(updateSpotlight, 500);
        
        window.addEventListener('resize', updateSpotlight);
        window.addEventListener('scroll', updateSpotlight);
        
        return () => {
          clearTimeout(timer);
          window.removeEventListener('resize', updateSpotlight);
          window.removeEventListener('scroll', updateSpotlight);
        };
      }
    } else {
      setSpotlightRect(null);
    }
  }, [currentStep]);

  const renderToggleButton = () => (
    <button 
      onClick={() => startTour()}
      className={`fixed bottom-6 left-6 z-[100] pointer-events-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-accent-500/20 text-accent-500 flex items-center gap-3 group overflow-hidden transition-all hover:pr-6 ${currentStep !== -1 ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}
    >
      <div className="w-8 h-8 rounded-lg bg-accent-500 text-white flex items-center justify-center">
        <i className="fas fa-magic"></i>
      </div>
      <span className="text-xs font-black uppercase tracking-widest opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all">
        Quick Tour
      </span>
    </button>
  );

  const step = currentStep >= 0 ? TOUR_STEPS[currentStep] : null;

  return (
    <>
      {renderToggleButton()}
      
      {currentStep !== -1 && step && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
          {/* Dimmed Backdrop with Spotlight Hole */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] transition-all duration-500"
            style={{
              clipPath: spotlightRect 
                ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${spotlightRect.left - 10}px ${spotlightRect.top - 10}px, ${spotlightRect.right + 10}px ${spotlightRect.top - 10}px, ${spotlightRect.right + 10}px ${spotlightRect.bottom + 10}px, ${spotlightRect.left - 10}px ${spotlightRect.bottom + 10}px, ${spotlightRect.left - 10}px ${spotlightRect.top - 10}px)` 
                : 'none'
            }}
          />

          {/* Popover */}
          {spotlightRect && (
            <div 
              ref={popoverRef}
              className="absolute z-10 pointer-events-auto transition-all duration-500 animate-fade-in-up"
              style={{
                left: `${spotlightRect.left + spotlightRect.width / 2}px`,
                top: step.position === 'bottom' ? `${spotlightRect.bottom + 30}px` : `${spotlightRect.top - 30}px`,
                transform: `translateX(-50%) ${step.position === 'top' ? 'translateY(-100%)' : ''}`
              }}
            >
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border-2 border-accent-500/30 w-[320px] relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-500 to-blue-600"></div>
                
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-black text-accent-500 uppercase tracking-widest">
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </span>
                  <button 
                    onClick={() => setCurrentStep(-1)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>

                <h4 className="text-xl font-heading font-black text-brand-900 dark:text-white mb-2 leading-tight">
                  {step.title}
                </h4>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                  {step.content}
                </p>

                <div className="flex items-center justify-between">
                  <button 
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                    className={`text-[10px] font-black uppercase tracking-widest transition-opacity ${currentStep === 0 ? 'opacity-0' : 'opacity-100 text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
                  >
                    Back
                  </button>
                  
                  <button 
                    onClick={() => {
                      if (currentStep === TOUR_STEPS.length - 1) {
                        setCurrentStep(-1);
                      } else {
                        setCurrentStep(prev => prev + 1);
                      }
                    }}
                    className="bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-900 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-lg"
                  >
                    {currentStep === TOUR_STEPS.length - 1 ? 'Finish Tour' : 'Next Step'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GuidedTour;