import React from 'react';

const Hero: React.FC = () => {
  const handleScrollAndTrigger = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      // Dispatch event to trigger voice playback after a short delay for scrolling
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('nxt-trigger-voice'));
      }, 800);
    }
  };

  const handleHeroAction = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[95vh] flex items-center justify-center overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-white/80 dark:bg-slate-900/85 z-10 backdrop-blur-[1px]"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-30 pt-20 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        <div className="space-y-8">
          <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-brand-900 dark:text-blue-200 text-sm font-semibold border border-white/40 dark:border-blue-700/30 mb-4 shadow-sm opacity-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
            </span>
            Neural Digital Workforce v2.5 Online
          </div>
          
          <h1 className="animate-fade-in-up delay-200 text-6xl md:text-8xl font-heading font-extrabold text-brand-900 dark:text-white leading-[1.1] tracking-tight opacity-0">
            Stop Chatting. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 via-blue-600 to-accent-500 bg-300% animate-gradient">
              Start Closing.
            </span>
          </h1>
          
          <p className="animate-fade-in-up delay-400 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed font-light opacity-0">
            Deploy hyper-realistic AI Voice Agents that qualify leads, book meetings, and 
            <span className="font-bold text-accent-600 dark:text-accent-400 mx-1 underline decoration-accent-500/30">increase ROI by 4x</span> 
            instantly.
          </p>
          
          <div className="animate-fade-in-up delay-600 flex flex-col sm:flex-row gap-5 justify-center pt-10 opacity-0">
            <a 
              href="#demo"
              onClick={(e) => handleHeroAction(e, 'demo')}
              className="group relative px-10 py-5 bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-950 rounded-2xl font-bold text-lg shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-accent-500/20"
            >
              <span className="relative z-10 flex items-center gap-2">
                Meet Your AI Agent 
                <i className="fas fa-robot group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300"></i>
              </span>
            </a>
            
            <a 
              href="#demo"
              onClick={(e) => handleScrollAndTrigger(e, 'demo')}
              className="group px-10 py-5 bg-white dark:bg-slate-800 text-brand-900 dark:text-white rounded-2xl font-bold text-lg border-2 border-gray-100 dark:border-slate-700 hover:border-accent-500 hover:bg-accent-5/10 dark:hover:bg-accent-950/20 transition-all duration-300 flex items-center gap-2 justify-center cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-accent-500/10"
            >
              <i className="fas fa-play-circle text-accent-500 text-2xl group-hover:scale-110 transition-transform duration-300"></i>
              Watch How it Works
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-50 dark:from-slate-900 to-transparent z-20 pointer-events-none"></div>
    </div>
  );
};

export default Hero;