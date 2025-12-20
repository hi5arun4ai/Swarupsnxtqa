import React from 'react';

const ChatWidget: React.FC = () => {
  const handleScrollToChat = () => {
    const element = document.getElementById('chat-bot');
    if (element) {
      // Immediately notify other components that chat is being initiated
      window.dispatchEvent(new CustomEvent('nxt-initiate-chat'));

      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div 
      className="fixed z-[999999] pointer-events-none select-none transform-gpu"
      style={{ 
        bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))',
        right: 'calc(1.5rem + env(safe-area-inset-right, 0px))',
        isolation: 'isolate'
      }}
    >
      <button 
        onClick={handleScrollToChat}
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-900 flex items-center justify-center shadow-[0_20px_60px_rgba(43,182,198,0.4)] dark:shadow-[0_30px_70px_rgba(0,0,0,0.7)] transition-all hover:scale-110 active:scale-90 group relative overflow-visible border-4 border-white/20 dark:border-white/10 pointer-events-auto transform-gpu ring-4 ring-transparent hover:ring-accent-500/20"
        aria-label="Chat with AI Agent"
        style={{
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
        }}
      >
        <div className="relative">
          <i className="fas fa-comment-dots text-2xl sm:text-3xl"></i>
          {/* Active Status Indicator */}
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-brand-900 dark:border-accent-500 rounded-full animate-pulse shadow-sm"></span>
        </div>
        
        {/* Tooltip Label - Adaptive visibility */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-brand-900 dark:bg-slate-800 text-white rounded-2xl shadow-2xl border border-white/10 whitespace-nowrap opacity-0 md:group-hover:opacity-100 transition-all transform translate-x-4 md:group-hover:translate-x-0 pointer-events-none hidden sm:flex items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            <span className="w-2 h-2 bg-accent-400 rounded-full animate-ping"></span>
            Speak with AI Agent
          </p>
          {/* Tail for tooltip */}
          <div className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-brand-900 dark:border-l-slate-800"></div>
        </div>

        {/* Ambient Ring Animation - Constant but subtle on mobile/tablet */}
        <div className="absolute inset-[-8px] rounded-full border-2 border-accent-500/20 animate-ping pointer-events-none opacity-40 group-hover:opacity-100"></div>
      </button>
    </div>
  );
};

export default ChatWidget;