import React, { useState, useEffect } from 'react';

interface NavbarProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isDarkMode, toggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Solutions', href: '#solutions' },
    { name: 'Live Demo', href: '#voice-studio' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Industries', href: '#industries' },
    { name: 'ROI', href: '#roi' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      try {
        window.history.pushState(null, "", href);
      } catch (err) {
        console.warn("Could not update history state:", err);
      }
    } else if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const tooltipClass = "absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-xl z-50";

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'glass-light dark:glass-dark shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a 
          href="#" 
          onClick={(e) => handleScrollToSection(e, '#')}
          className="cursor-pointer flex items-center group"
        >
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-gradient-to-br from-brand-900 to-blue-600 dark:from-white dark:to-gray-300 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 group-hover:scale-105">
                <i className="fas fa-wave-square text-white dark:text-brand-900 text-sm"></i>
            </div>
            <span className="text-xl font-heading font-extrabold text-brand-900 dark:text-white tracking-tight">
                Swarups<span className="text-accent-500">NXT</span>
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="font-medium text-gray-600 dark:text-gray-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors cursor-pointer text-sm lg:text-base"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="group relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors text-brand-900 dark:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-accent-500"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-describedby="theme-tooltip"
          >
            {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
            <span id="theme-tooltip" role="tooltip" className={tooltipClass}>
              {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            </span>
          </button>
          
          {/* WhatsApp / CTA */}
          <a 
            href="https://wa.me/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-full font-semibold transition-transform hover:-translate-y-0.5 shadow-lg shadow-accent-500/30 text-sm lg:text-base"
            aria-label="Talk to an expert via WhatsApp"
            aria-describedby="whatsapp-tooltip"
          >
            <i className="fab fa-whatsapp text-lg"></i>
            <span>Talk to Expert</span>
            <span id="whatsapp-tooltip" role="tooltip" className={tooltipClass}>
              Chat with an Expert
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
            <button 
            onClick={toggleTheme}
            className="group relative p-2 rounded-full text-brand-900 dark:text-yellow-400 focus:outline-none"
            aria-label={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <i className="fas fa-sun"></i> : <i className="fas fa-moon"></i>}
          </button>
          <button 
            className="group relative text-gray-800 dark:text-white focus:outline-none p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-2xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-light dark:glass-dark border-t border-gray-200 dark:border-slate-700 shadow-xl p-6 flex flex-col space-y-4 animate-fade-in-up">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleScrollToSection(e, link.href)}
              className="text-lg font-medium text-gray-800 dark:text-gray-200"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/" 
            className="w-full text-center bg-accent-500 text-white py-3 rounded-lg font-bold shadow-md"
          >
            <i className="fab fa-whatsapp mr-2"></i>
            Talk to Expert
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;