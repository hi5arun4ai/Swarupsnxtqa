import React from 'react';

const Hero: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
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
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/80 z-10 backdrop-blur-[2px]"></div>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          {/* Abstract Tech Lines Video */}
          <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-20 pt-20 px-6 flex flex-col items-center text-center max-w-5xl mx-auto">
        
        <div className="animate-fade-in-up space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-slate-800/50 backdrop-blur-md text-brand-900 dark:text-blue-200 text-sm font-semibold border border-white/40 dark:border-blue-700/50 mb-4 shadow-sm">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-500"></span>
            </span>
            The Future of Work is Here
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-brand-900 dark:text-white leading-tight tracking-tight drop-shadow-sm">
            Hire Your Next <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-500 via-blue-600 to-accent-500 bg-300% animate-gradient">
              Top Performer.
            </span>
            <span className="block mt-2 text-4xl md:text-6xl text-gray-800 dark:text-gray-200 opacity-90">It’s AI.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed font-light">
            Bespoke Digital Employees, Voice Agents, and Intelligent CRMs working 
            <span className="font-bold text-accent-600 dark:text-accent-400 mx-1">24/7</span> 
            to scale your business effortlessly.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-10">
            <a 
              href="#demo"
              onClick={(e) => handleScroll(e, 'demo')}
              className="group relative px-8 py-4 bg-brand-900 dark:bg-white text-white dark:text-brand-900 rounded-full font-bold text-lg overflow-hidden shadow-2xl hover:shadow-brand-900/40 dark:hover:shadow-white/20 transition-all transform hover:-translate-y-1 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2">
                Meet Your AI Agent 
                <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-brand-900 dark:from-gray-100 dark:to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
            
            <a 
              href="#voice-studio"
              onClick={(e) => handleScroll(e, 'voice-studio')}
              className="px-8 py-4 glass-light dark:bg-slate-800/80 text-brand-900 dark:text-white rounded-full font-bold text-lg border border-white/40 dark:border-white/30 hover:bg-white/60 dark:hover:bg-slate-700 transition-all flex items-center gap-2 justify-center cursor-pointer shadow-lg dark:shadow-slate-900/50"
            >
              <i className="fas fa-play-circle text-accent-500 text-xl"></i>
              Watch How It Works
            </a>
          </div>
        </div>
      </div>
      
      {/* Decorative Blur at bottom to blend with next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-gray-50 dark:from-slate-900 to-transparent z-20"></div>
    </div>
  );
};

export default Hero;