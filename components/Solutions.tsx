import React from 'react';

const solutions = [
  {
    icon: "fa-headset",
    title: "Voice Agents",
    desc: "Human-like AI that handles inbound support and outbound sales calls with zero latency.",
    img: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-robot",
    title: "Smart Chatbots",
    desc: "Omnichannel chatbots that qualify leads and sync data instantly with your CRM.",
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-cloud",
    title: "CCaaS",
    desc: "Contact Center as a Service. Replace your entire call center stack with one AI platform.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
  },
  {
    icon: "fa-brain",
    title: "AI CRM",
    desc: "A CRM that thinks. Auto-updates fields, predicts deal closures, and suggests next steps.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
  }
];

const Solutions: React.FC = () => {
  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white mb-4">
          Complete <span className="text-accent-500">Intelligence Stack</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Everything you need to automate customer interactions and operational workflows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {solutions.map((item, index) => (
          <div 
            key={index}
            className="group relative bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-accent-500/50 overflow-hidden"
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
               <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-50 dark:bg-slate-700 rounded-2xl flex items-center justify-center text-accent-500 text-2xl mb-6 group-hover:bg-accent-500 group-hover:text-white transition-colors duration-300 shadow-md">
                <i className={`fas ${item.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold text-brand-900 dark:text-white mb-3">
                {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.desc}
                </p>
            </div>
            
            {/* Hover Glow Effect */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-accent-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Solutions;