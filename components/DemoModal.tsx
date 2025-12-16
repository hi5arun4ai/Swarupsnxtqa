import React from 'react';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden animate-blob">
        <div className="flex justify-between items-center p-4 border-b border-gray-100 dark:border-slate-800">
            <h3 className="text-xl font-bold text-brand-900 dark:text-white">Book Your Strategy Session</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
                <i className="fas fa-times text-2xl"></i>
            </button>
        </div>
        
        <div className="w-full h-[600px] bg-gray-50 dark:bg-slate-800">
           {/* Placeholder for Zoho Calendar or Calendly */}
           <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <i className="far fa-calendar-alt text-6xl mb-4"></i>
              <p className="text-lg">Calendar Integration Loaded Here</p>
              <p className="text-sm opacity-60">(Zoho / Calendly iframe placeholder)</p>
           </div>
           {/* 
             Actual Implementation would be:
             <iframe src="YOUR_CALENDAR_URL" className="w-full h-full border-0"></iframe> 
           */}
        </div>
      </div>
    </div>
  );
};

export default DemoModal;