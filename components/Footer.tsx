import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0 flex flex-col items-start">
            <a href="#" className="inline-block flex items-center gap-2 mb-2 group">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-900 to-blue-600 dark:from-white dark:to-gray-300 rounded-lg flex items-center justify-center shadow-md">
                    <i className="fas fa-wave-square text-white dark:text-brand-900 text-xs"></i>
                </div>
                <span className="text-xl font-heading font-extrabold text-brand-900 dark:text-white tracking-tight">
                    Swarups<span className="text-accent-500">NXT</span>
                </span>
            </a>
            <p className="text-gray-500 text-sm mt-2">Empowering businesses with Next-Gen AI.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-brand-900 dark:hover:text-white transition-colors">
                <i className="fab fa-linkedin text-xl"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-900 dark:hover:text-white transition-colors">
                <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-900 dark:hover:text-white transition-colors">
                <i className="fab fa-instagram text-xl"></i>
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between text-sm text-gray-500">
          <p>&copy; 2025 Swarups NXT. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;