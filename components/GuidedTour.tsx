import React, { useState, useEffect, useRef, useCallback } from 'react';

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
  const [currentStep, setCurrentStep] = useState(-1);
  const [spotlightRect, setSpotlightRect] = useState<{ top: number, bottom: number, left: number, right: number, width: number, height: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  
  const popoverRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const trackingFrameRef = useRef<number>(0);
  const tourStartedRef = useRef(false);

  const updateSpotlight = useCallback(() => {
    if (currentStep < 0 || currentStep >= TOUR_STEPS.length || isBlocked) {
      if (spotlightRect !== null) setSpotlightRect(null);
      return;
    }

    const step = TOUR_STEPS[currentStep];
    const element = document.getElementById(step.targetId);
    if (element) {
      const rect = element.getBoundingClientRect();
      
      // Update with a small threshold to avoid sub-pixel jitter
      setSpotlightRect(prev => {
        if (!prev || 
            Math.abs(prev.top - rect.top) > 0.1 || 
            Math.abs(prev.left - rect.left) > 0.1 ||
            Math.abs(prev.width - rect.width) > 0.1 ||
            Math.abs(prev.height - rect.height) > 0.1) {
          return {
            top: rect.top,
            bottom: rect.bottom,
            left: rect.left,
            right: rect.right,
            width: rect.width,
            height: rect.height
          };
        }
        return prev;
      });
    } else {
      if (spotlightRect !== null) setSpotlightRect(null);
    }
  }, [currentStep, isBlocked, spotlightRect]);

  // Sync with browser paint cycle
  const startTracking = useCallback(() => {
    const track = () => {
      updateSpotlight();
      trackingFrameRef.current = requestAnimationFrame(track);
    };
    trackingFrameRef.current = requestAnimationFrame(track);
    // Track for duration of most transitions
    setTimeout(() => cancelAnimationFrame(trackingFrameRef.current), 2500);
  }, [updateSpotlight]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      updateSpotlight();
    };
    
    const handleChatInitiate = () => {
      setIsBlocked(true);
      setCurrentStep(-1);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', updateSpotlight, { passive: true });
    window.addEventListener('nxt-initiate-chat', handleChatInitiate);
    
    handleResize();

    const hasSeenTour = localStorage.getItem('nxt_tour_completed');
    if (!hasSeenTour && !isBlocked && !tourStartedRef.current) {
      const timer = setTimeout(() => {
        if (!isBlocked && !tourStartedRef.current) {
          setCurrentStep(0);
          tourStartedRef.current = true;
        }
      }, 3000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', updateSpotlight);
      window.removeEventListener('nxt-initiate-chat', handleChatInitiate);
      cancelAnimationFrame(trackingFrameRef.current);
    };
  }, [updateSpotlight, isBlocked]);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    if (currentStep >= 0 && !isBlocked) {
      const step = TOUR_STEPS[currentStep];
      const element = document.getElementById(step.targetId);
      if (element) {
        observerRef.current = new ResizeObserver(() => {
          requestAnimationFrame(updateSpotlight);
        });
        observerRef.current.observe(element);
        
        // Stabilized scroll logic
        const scrollTimer = setTimeout(() => {
          let headerOffset = 150;
          if (isMobile) headerOffset = 80;
          else if (isTablet) headerOffset = 120;

          const rect = element.getBoundingClientRect();
          const offsetPosition = rect.top + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          startTracking();
        }, 50);

        return () => clearTimeout(scrollTimer);
      }
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [currentStep, isMobile, isTablet, updateSpotlight, startTracking, isBlocked]);

  const getPopoverStyle = () => {
    if (!spotlightRect || currentStep === -1 || isBlocked) return { display: 'none' };

    // Mobile/Tablet centering
    if (isMobile || isTablet) {
      return {
        position: 'fixed' as const,
        bottom: '2rem',
        left: '1rem',
        right: '1rem',
        width: 'auto',
        zIndex: 10000,
        pointerEvents: 'auto' as const
      };
    }

    // Desktop refined positioning
    const popoverWidth = 400;
    const margin = 24;
    let leftPos = spotlightRect.left + (spotlightRect.width / 2);
    const halfWidth = popoverWidth / 2;
    
    if (leftPos - halfWidth < margin) leftPos = halfWidth + margin;
    else if (leftPos + halfWidth > window.innerWidth - margin) leftPos = window.innerWidth - halfWidth - margin;

    const step = TOUR_STEPS[currentStep];
    const verticalPadding = 40;
    let topPos = step.position === 'bottom' 
      ? spotlightRect.bottom + verticalPadding 
      : spotlightRect.top - verticalPadding;

    return {
      left: `${leftPos}px`,
      top: `${topPos}px`,
      transform: `translateX(-50%) ${step.position === 'top' ? 'translateY(-100%)' : ''}`,
      position: 'fixed' as const,
      width: `${popoverWidth}px`,
      maxWidth: 'calc(100vw - 48px)',
      zIndex: 10000,
      pointerEvents: 'auto' as const
    };
  };

  const step = currentStep >= 0 && !isBlocked ? TOUR_STEPS[currentStep] : null;

  return (
    <>
      <button 
        onClick={() => { 
          setIsBlocked(false); 
          setCurrentStep(0); 
          localStorage.setItem('nxt_tour_completed', 'true'); 
        }}
        className={`fixed bottom-6 left-6 z-[100] bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-3 rounded-2xl shadow-xl border border-accent-500/20 text-accent-500 flex items-center gap-3 group transition-all hover:pr-6 ${currentStep !== -1 || isBlocked ? 'opacity-0 scale-50 pointer-events-none' : 'opacity-100 scale-100'}`}
      >
        <div className="w-8 h-8 rounded-lg bg-accent-500 text-white flex items-center justify-center">
          <i className="fas fa-magic"></i>
        </div>
        <span className="text-xs font-black uppercase tracking-widest opacity-0 w-0 group-hover:opacity-100 group-hover:w-auto transition-all">
          Quick Tour
        </span>
      </button>
      
      {currentStep !== -1 && step && !isBlocked && (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden select-none">
          {/* Spotlight with stable padding */}
          <div 
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-[2px] transition-all duration-300"
            style={{
              clipPath: spotlightRect 
                ? `polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%, 0% 0%, ${spotlightRect.left - 20}px ${spotlightRect.top - 20}px, ${spotlightRect.right + 20}px ${spotlightRect.top - 20}px, ${spotlightRect.right + 20}px ${spotlightRect.bottom + 20}px, ${spotlightRect.left - 20}px ${spotlightRect.bottom + 20}px, ${spotlightRect.left - 20}px ${spotlightRect.top - 20}px)` 
                : 'none'
            }}
          />

          <div 
            ref={popoverRef}
            className="transition-all duration-300 animate-fade-in-up flex justify-center"
            style={getPopoverStyle()}
          >
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 md:p-8 shadow-2xl border-2 border-accent-500/30 w-full relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent-500 to-blue-600"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-accent-500"></span>
                  <span className="text-[10px] font-black text-accent-500 uppercase tracking-widest">
                    Step {currentStep + 1} of {TOUR_STEPS.length}
                  </span>
                </div>
                <button 
                  onClick={() => setCurrentStep(-1)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>

              <h4 className="text-xl md:text-2xl font-heading font-black text-brand-900 dark:text-white mb-3 leading-tight">
                {step.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-8 font-medium">
                {step.content}
              </p>

              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                  disabled={currentStep === 0}
                  className={`text-[10px] font-black uppercase tracking-widest transition-all p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 ${currentStep === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100 text-slate-400 hover:text-brand-900 dark:hover:text-white'}`}
                >
                  Back
                </button>
                
                <button 
                  onClick={() => {
                    if (currentStep === TOUR_STEPS.length - 1) {
                      setCurrentStep(-1);
                      localStorage.setItem('nxt_tour_completed', 'true');
                    } else {
                      setCurrentStep(prev => prev + 1);
                    }
                  }}
                  className="bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-900 px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-900/10 dark:shadow-accent-500/20"
                >
                  {currentStep === TOUR_STEPS.length - 1 ? 'Get Started' : 'Continue'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GuidedTour;