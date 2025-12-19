import React from 'react';

const Integrations: React.FC = () => {
  const brands = [
    { name: "Salesforce", icon: "fa-salesforce" },
    { name: "HubSpot", icon: "fa-hubspot" },
    { name: "Zoho", icon: "fa-z" }, // Simulated
    { name: "Zendesk", icon: "fa-envira" }, // Simulated lookalike
    { name: "Shopify", icon: "fa-shopify" },
    { name: "Slack", icon: "fa-slack" },
    { name: "WhatsApp", icon: "fa-whatsapp" },
    { name: "Zapier", icon: "fa-bolt" },
    { name: "Pipedrive", icon: "fa-timeline" }, // Simulated
    { name: "Intercom", icon: "fa-rocketchat" }
  ];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-y border-gray-100 dark:border-slate-800 py-8 overflow-hidden relative">
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">
          Seamlessly Integrated With Your Stack
        </p>
      </div>
      
      {/* Gradient Masks */}
      <div className="absolute left-0 top-0 h-full w-20 md:w-32 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 h-full w-20 md:w-32 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10"></div>

      <div className="flex gap-16 animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        {/* Double the list for seamless loop */}
        {[...brands, ...brands, ...brands].map((brand, index) => (
          <div 
            key={index} 
            className="flex items-center gap-3 text-gray-400 dark:text-gray-500 hover:text-brand-900 dark:hover:text-white transition-colors duration-300 cursor-default"
          >
            <i className={`fab ${brand.icon} text-3xl`}></i>
            <span className="text-xl font-bold opacity-80">{brand.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Integrations;