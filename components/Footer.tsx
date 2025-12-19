import React, { useState } from 'react';

interface FooterProps {
  onOpenPrivacy?: () => void;
  onOpenSecurity?: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onOpenSecurity }) => {
  const [logoError, setLogoError] = useState(false);

  const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrivacyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenPrivacy) onOpenPrivacy();
  };

  const handleSecurityClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenSecurity) onOpenSecurity();
  };

  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pt-20 pb-10 relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-12">
          
          <div className="max-w-sm space-y-6">
            <a 
              href="#" 
              onClick={handleScrollToTop}
              className="inline-flex items-center group h-12 md:h-14 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-lg p-1"
            >
              {!logoError ? (
                <img 
                  src="img/logo.svg" 
                  alt="Swarups NXT" 
                  className="h-full w-auto object-contain transition-all duration-500 group-hover:scale-105 dark:brightness-0 dark:invert"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <span className="text-2xl font-heading font-black text-brand-900 dark:text-white transition-all duration-300 group-hover:scale-105">
                  Swarups<span className="text-accent-500">NXT</span>
                </span>
              )}
            </a>
            
            <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed font-medium">
              Architecting the future of human-AI collaboration. We deploy next-generation digital employees that think, talk, and close like your best agents.
            </p>

            <div className="flex items-center gap-4">
              <div className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 dark:text-slate-500">
                All Systems Operational
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 lg:gap-20">
            <div className="space-y-6">
              <h4 className="text-xs font-black text-brand-900 dark:text-white uppercase tracking-widest">Platform</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500 dark:text-slate-400">
                <li><a href="#solutions" className="hover:text-accent-500 transition-colors">Solutions</a></li>
                <li><a href="#demo" className="hover:text-accent-500 transition-colors">Voice Studio</a></li>
                <li><a href="#comparison" className="hover:text-accent-500 transition-colors">Benchmarks</a></li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-black text-brand-900 dark:text-white uppercase tracking-widest">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-gray-500 dark:text-slate-400">
                <li><a href="#why-us" className="hover:text-accent-500 transition-colors">Why Us</a></li>
                <li><a href="#industries" className="hover:text-accent-500 transition-colors">Industries</a></li>
                <li><a href="#roi" className="hover:text-accent-500 transition-colors">ROI Calculator</a></li>
              </ul>
            </div>

            <div className="space-y-6 col-span-2 sm:col-span-1">
              <h4 className="text-xs font-black text-brand-900 dark:text-white uppercase tracking-widest">Social Connection</h4>
              <div className="flex gap-4">
                {[
                  { icon: 'fa-linkedin-in', href: '#' },
                  { icon: 'fa-twitter', href: '#' },
                  { icon: 'fa-instagram', href: '#' },
                  { icon: 'fa-github', href: '#' }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href} 
                    className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 flex items-center justify-center text-gray-500 hover:text-white hover:bg-brand-900 dark:hover:bg-accent-500 hover:border-transparent transition-all duration-300 shadow-sm"
                  >
                    <i className={`fab ${social.icon}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-slate-800 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
            <p>&copy; 2025 Swarups NXT Intelligence.</p>
            <div className="flex gap-6">
              <a 
                href="#" 
                onClick={handlePrivacyClick}
                className="hover:text-brand-900 dark:hover:text-white transition-colors"
              >
                Privacy Protocol
              </a>
              <a 
                href="#" 
                onClick={handleSecurityClick}
                className="hover:text-brand-900 dark:hover:text-white transition-colors"
              >
                Security Terms
              </a>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-bolt text-accent-500"></i>
            <span>Powering the autonomous enterprise</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;