import React from 'react';

const Comparison: React.FC = () => {
  const features = [
    { 
      label: "Reasoning Capacity", 
      legacy: "Keyword-based / Linear Trees", 
      nxt: "Native Neural Reasoning (Gemini 3)", 
      win: true 
    },
    { 
      label: "Response Latency", 
      legacy: "2-5 Seconds (Laggy)", 
      nxt: "Sub-200ms Instant Response", 
      win: true 
    },
    { 
      label: "Emotional Intelligence", 
      legacy: "Robotic / Mono-tone", 
      nxt: "Sentiment-Aware / Human Nuance", 
      win: true 
    },
    { 
      label: "Integration Depth", 
      legacy: "Basic Webhooks Only", 
      nxt: "Deep CRM & Workflow Autonomy", 
      win: true 
    },
    { 
      label: "Availability", 
      legacy: "Requires Human Supervision", 
      nxt: "100% Autonomous 24/7/365", 
      win: true 
    }
  ];

  return (
    <div className="container mx-auto px-6 max-w-6xl">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl md:text-5xl font-heading font-black text-brand-900 dark:text-white">
          The <span className="text-accent-500">NXT</span> Generation Gap.
        </h2>
        <p className="text-gray-500 dark:text-gray-400 font-bold max-w-2xl mx-auto">
          Don't settle for "Bot" technology from 2022. Experience native intelligence.
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border-4 border-gray-100 dark:border-slate-800 overflow-hidden">
        <div className="grid grid-cols-3 bg-gray-50 dark:bg-slate-950 border-b-2 border-gray-100 dark:border-slate-800">
          <div className="p-8 text-xs font-black uppercase tracking-widest text-gray-400">Capability</div>
          <div className="p-8 text-xs font-black uppercase tracking-widest text-gray-400">Traditional Bots</div>
          <div className="p-8 text-xs font-black uppercase tracking-widest text-brand-900 dark:text-accent-400 bg-accent-500/5">Swarups NXT</div>
        </div>

        {features.map((f, i) => (
          <div key={i} className="grid grid-cols-3 border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50/50 dark:hover:bg-slate-800/30 transition-colors">
            <div className="p-8 text-sm font-black text-brand-900 dark:text-white flex items-center">
              {f.label}
            </div>
            <div className="p-8 text-sm font-medium text-gray-500 dark:text-slate-500 flex items-center italic">
              {f.legacy}
            </div>
            <div className="p-8 text-sm font-black text-brand-900 dark:text-white bg-accent-500/5 flex items-center gap-3">
              <i className="fas fa-circle-check text-accent-500"></i>
              {f.nxt}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-12 flex justify-center">
        <div className="flex items-center gap-8 px-8 py-4 bg-accent-100 dark:bg-accent-950/30 rounded-2xl border-2 border-accent-200 dark:border-accent-900/40">
           <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-300">
                   <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="rounded-full" />
                </div>
              ))}
           </div>
           <p className="text-sm font-black text-brand-900 dark:text-accent-400 uppercase tracking-widest">
              Join 450+ Companies Upgrading Today
           </p>
        </div>
      </div>
    </div>
  );
};

export default Comparison;