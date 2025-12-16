import React from 'react';

const WhyUs: React.FC = () => {
  const pillars = [
    {
      title: "Bespoke Intelligence",
      desc: "Models fine-tuned specifically on your company data, ensuring on-brand and accurate responses every time.",
      color: "bg-blue-500",
      icon: "fa-brain"
    },
    {
      title: "Enterprise Reliability",
      desc: "Bank-grade security encryption with 99.99% uptime SLA. Your data privacy is our absolute priority.",
      color: "bg-indigo-500",
      icon: "fa-shield-alt"
    },
    {
      title: "Cost Leadership",
      desc: "Reduce operational overheads by up to 60% while scaling your support capacity infinitely.",
      color: "bg-cyan-500",
      icon: "fa-chart-line"
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left: Image */}
        <div className="lg:w-1/2 relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-accent-500 to-blue-600 rounded-[2.5rem] opacity-30 blur-2xl group-hover:opacity-50 transition-opacity duration-500"></div>
          <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white/50 dark:border-slate-700/50">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
              alt="Team collaborating" 
              className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
            />
            {/* Floating Stats Card */}
            <div className="absolute bottom-6 right-6 glass-light dark:glass-dark p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-4 animate-float">
                <div className="bg-green-100 dark:bg-green-900/50 p-3 rounded-full text-green-600 dark:text-green-400">
                    <i className="fas fa-check-double text-xl"></i>
                </div>
                <div>
                    <p className="text-xs font-bold text-gray-500 uppercase">Success Rate</p>
                    <p className="text-xl font-bold text-brand-900 dark:text-white">99.8%</p>
                </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="lg:w-1/2 space-y-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white mb-6">
              Why Leading Brands <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-accent-500">
                 Choose Swarups NXT
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We don't just provide software; we provide digital workers that integrate seamlessly into your existing team structure.
            </p>
          </div>

          <div className="space-y-6">
            {pillars.map((pillar, idx) => (
              <div 
                key={idx} 
                className="flex gap-6 p-4 rounded-2xl transition-all duration-300 hover:bg-white/50 dark:hover:bg-slate-800/50 border border-transparent hover:border-gray-100 dark:hover:border-slate-700"
              >
                <div className={`w-14 h-14 shrink-0 ${pillar.color} rounded-2xl shadow-lg shadow-${pillar.color}/20 flex items-center justify-center text-white text-xl`}>
                  <i className={`fas ${pillar.icon}`}></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-2">{pillar.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyUs;