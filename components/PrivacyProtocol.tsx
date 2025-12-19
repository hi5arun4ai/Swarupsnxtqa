import React from 'react';

interface PrivacyProtocolProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyProtocol: React.FC<PrivacyProtocolProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
      {/* High-End Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-xl animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Protocol Container */}
      <div className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white dark:bg-slate-950 rounded-[2.5rem] shadow-2xl border-2 border-white/20 dark:border-accent-500/10 overflow-hidden flex flex-col animate-fade-in-up">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white">
              <i className="fas fa-shield-halved text-xl"></i>
            </div>
            <div>
              <h2 className="text-xl font-heading font-black text-brand-900 dark:text-white uppercase tracking-tight">Privacy Protocol</h2>
              <p className="text-[10px] font-black text-accent-600 dark:text-accent-400 uppercase tracking-widest">Compliance: DPDP ACT 2023 (INDIA)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center text-gray-400"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12 custom-scrollbar">
          
          {/* Section 1: Entity & Status */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-accent-500 text-xs font-black uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-accent-500/30"></span>
              01. Entity Status
            </div>
            <h3 className="text-2xl font-heading font-bold text-brand-900 dark:text-white">Proprietorship Overview</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Swarups NXT is an Indian Sole Proprietorship specializing in the reselling and integration of high-performance Artificial Intelligence SaaS tools. This Privacy Protocol outlines our commitment to your data security and transparency in accordance with the <span className="text-brand-900 dark:text-white font-bold">Digital Personal Data Protection (DPDP) Act 2023.</span>
            </p>
          </section>

          {/* Section 2: Data Flow Architecture */}
          <section className="bg-gray-50 dark:bg-slate-900/50 p-8 rounded-[2rem] border border-gray-100 dark:border-slate-800 space-y-6">
            <div className="flex items-center gap-3 text-accent-500 text-xs font-black uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-accent-500/30"></span>
              02. Transmission Architecture
            </div>
            <h3 className="text-2xl font-heading font-bold text-brand-900 dark:text-white">The Zero-Storage Policy</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Swarups NXT operates as a <span className="italic">Neural Interface Layer</span>. We explicitly state that:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {[
                { icon: "fa-database", text: "We do not store, record, or log any voice or chat data processed through our agents." },
                { icon: "fa-route", text: "All data flows via secure, encrypted channels directly to our primary SaaS partners." },
                { icon: "fa-user-shield", text: "We do not sell, trade, or analyze your business conversation metadata." },
                { icon: "fa-bolt", text: "Real-time interactions are ephemeral and exist only during the active session duration." }
              ].map((item, i) => (
                <li key={i} className="flex gap-4 p-4 bg-white dark:bg-slate-950 rounded-xl border border-gray-100 dark:border-slate-800">
                  <i className={`fas ${item.icon} text-accent-500 mt-1`}></i>
                  <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{item.text}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Section 3: Necessary Cookies Only */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 text-accent-500 text-xs font-black uppercase tracking-widest">
              <span className="w-8 h-[1px] bg-accent-500/30"></span>
              03. Cookie Protocol
            </div>
            <h3 className="text-2xl font-heading font-bold text-brand-900 dark:text-white">Strictly Necessary Logic</h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
              Our web interface utilizes only <span className="text-brand-900 dark:text-white font-bold">Strictly Necessary Cookies</span>. These are essential for core platform functionality, specifically regarding:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border-2 border-gray-50 dark:border-slate-800 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-600 mb-1 block">Security Node</span>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Auth tokens and CSRF protection to prevent unauthorized session access.</p>
              </div>
              <div className="p-4 border-2 border-gray-50 dark:border-slate-800 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-accent-600 mb-1 block">UI Integrity</span>
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Theme preferences (Dark/Light mode) and tour completion status.</p>
              </div>
            </div>
            <p className="text-xs font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Note: We do not utilize third-party advertising or cross-site tracking cookies.</p>
          </section>

          {/* Section 4: Third Parties & Grievance */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="space-y-4">
              <div className="flex items-center gap-3 text-accent-500 text-xs font-black uppercase tracking-widest">
                <span className="w-8 h-[1px] bg-accent-500/30"></span>
                04. Partner Ecosystem
              </div>
              <h4 className="text-lg font-bold text-brand-900 dark:text-white tracking-tight">Data Sharing Protocols</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Data is shared exclusively with our vetted SaaS vendors (e.g., Google GenAI, Vapi, Retell) solely to facilitate the core AI services you consume. Each partner is selected based on rigorous SOC2 and enterprise-grade privacy compliance.
              </p>
            </section>

            <section className="p-6 bg-accent-50 dark:bg-accent-950/20 rounded-2xl border-2 border-accent-100 dark:border-accent-900/50 space-y-4">
              <h4 className="text-lg font-bold text-brand-900 dark:text-white flex items-center gap-2">
                <i className="fas fa-user-tie text-accent-500"></i>
                Grievance Officer
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300 font-bold">
                In compliance with the DPDP Act 2023, for any privacy concerns or data requests, please contact our designated officer:
              </p>
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-accent-600">Secure Direct</p>
                <a href="mailto:grievance@swarupsnxt.com" className="text-brand-900 dark:text-white font-black hover:text-accent-500 transition-colors">
                  grievance@swarupsnxt.com
                </a>
              </div>
            </section>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50 flex justify-center shrink-0">
          <button 
            onClick={onClose}
            className="px-10 py-4 bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-900 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl transition-all hover:scale-105 active:scale-95"
          >
            Acknowledge Protocol
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyProtocol;