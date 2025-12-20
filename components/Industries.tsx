import React, { useState } from 'react';

interface IndustryData {
  title: string;
  desc: string;
  icon: string;
  image: string;
  color: string;
  tagline: string;
  faq: {
    q: string;
    a: string;
  };
}

const Industries: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const useCases: IndustryData[] = [
    {
      title: "Real Estate",
      tagline: "Automate viewings and lead qualification.",
      desc: "Deploy voice agents that handle property inquiries instantly. Our AI qualifies buyers by asking budget, location preference, and timeline questions, then directly books viewings into your agents' calendars.",
      icon: "fa-building-columns",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
      color: "from-blue-600 to-cyan-500",
      faq: {
        q: "Can the AI handle complex floor plan queries?",
        a: "Yes. By feeding your project brochures into our Neural Forge, the agent learns every detail—from square footage to specific amenities—answering questions with 99% accuracy."
      }
    },
    {
      title: "Healthcare",
      tagline: "Secure and private patient scheduling.",
      desc: "Manage high-volume appointment requests without the overhead. Our healthcare-tuned agents provide pre-consultation screening, appointment reminders, and follow-up care instructions in a compassionate, human-like voice while maintaining total data privacy.",
      icon: "fa-stethoscope",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
      color: "from-emerald-500 to-teal-600",
      faq: {
        q: "How do you ensure patient data privacy?",
        a: "Every transmission is encrypted at rest and in transit. We follow strict enterprise security protocols, ensuring sensitive health data remains isolated and encrypted within our secure neural gateway."
      }
    },
    {
      title: "E-Commerce",
      tagline: "Recover carts and track orders 24/7.",
      desc: "Transform your support center from a cost to a revenue generator. AI agents can reach out to abandoned carts with personalized offers, handle returns, and update customers on shipping status across voice and WhatsApp.",
      icon: "fa-cart-shopping",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
      color: "from-purple-600 to-fuchsia-500",
      faq: {
        q: "Does it integrate with Shopify and Magento?",
        a: "Seamlessly. Our native integration syncs with your inventory and order management systems to provide real-time updates to your customers without human intervention."
      }
    },
    {
      title: "Banking & Finance",
      tagline: "Secure, automated debt collection & KYC.",
      desc: "Accelerate your back-office operations. Our financial agents assist with KYC documentation, handle soft-collections, and explain loan products with a professional, assertive persona tailored for trust.",
      icon: "fa-piggy-bank",
      image: "https://images.unsplash.com/photo-1550565118-3d1428df4a7f?q=80&w=800&auto=format&fit=crop",
      color: "from-amber-500 to-orange-600",
      faq: {
        q: "Can the AI handle multi-step identity verification?",
        a: "Yes. The AI can guide users through document uploads and perform real-time voice-biometric checks to verify identities before proceeding with sensitive tasks."
      }
    },
    {
      title: "Recruitment",
      tagline: "Screen 1000s of candidates in minutes.",
      desc: "Stop wasting hours on initial screening calls. Our AI recruitment specialists conduct first-round voice interviews, scoring candidates on skills, experience, and soft skills based on your specific hiring criteria.",
      icon: "fa-user-astronaut",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      color: "from-rose-500 to-red-700",
      faq: {
        q: "How does the AI evaluate soft skills?",
        a: "By using advanced sentiment analysis and linguistic pattern recognition, the agent assesses communication clarity, confidence, and professionalism during the call."
      }
    }
  ];

  return (
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="text-center mb-20 space-y-4">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-accent-100 dark:bg-accent-950/40 text-accent-700 dark:text-accent-400 text-xs font-black uppercase tracking-[0.2em] mb-4 border border-accent-200 dark:border-accent-900/50">
           <i className="fas fa-microchip"></i> Sector Matrix
        </div>
        <h2 className="text-4xl md:text-6xl font-heading font-black text-brand-900 dark:text-white tracking-tight">
          Adaptive <span className="text-accent-500">Intelligence.</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-bold text-lg">
          Specialized neural frameworks engineered for the specific demands of your industry.
        </p>
      </div>

      <div className="space-y-6">
        {useCases.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`group overflow-hidden rounded-[2.5rem] transition-all duration-700 border-4 
                ${isOpen 
                  ? 'bg-white dark:bg-slate-900 border-accent-500 shadow-[0_20px_50px_rgba(43,182,198,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
                  : 'bg-white/40 dark:bg-slate-800/40 border-gray-100 dark:border-slate-800 hover:border-accent-500/30'
                }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-6 md:p-8 flex items-center gap-6 text-left focus:outline-none focus-visible:bg-accent-50 transition-all"
                aria-expanded={isOpen}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all duration-500 shrink-0 ${isOpen ? 'bg-brand-900 text-white shadow-xl rotate-3 scale-110' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 group-hover:bg-accent-500 group-hover:text-white'}`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className={`text-xl md:text-2xl font-black tracking-tight transition-colors ${isOpen ? 'text-brand-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                      {item.title}
                    </h3>
                    {isOpen && (
                      <span className="hidden sm:inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    )}
                  </div>
                  <p className={`text-sm font-bold transition-all ${isOpen ? 'text-accent-600 dark:text-accent-400' : 'text-gray-400 dark:text-slate-500'}`}>
                    {item.tagline}
                  </p>
                </div>

                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-500 shrink-0 ${isOpen ? 'rotate-180 bg-accent-500 border-accent-500 text-white shadow-lg' : 'border-gray-200 dark:border-slate-700 text-gray-400'}`}>
                   <i className="fas fa-chevron-down text-sm"></i>
                </div>
              </button>

              {/* Accordion Body */}
              <div 
                className={`transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                 <div className="p-8 md:p-10 pt-0 border-t-2 border-gray-50 dark:border-slate-800 flex flex-col md:flex-row gap-12 items-start">
                    
                    {/* Visual Preview */}
                    <div className="md:w-5/12 w-full">
                       <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl group/img">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-1000 group-hover/img:scale-110" />
                          <div className={`absolute inset-0 bg-gradient-to-tr ${item.color} opacity-40 mix-blend-overlay`}></div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                          <div className="absolute bottom-4 left-4 flex gap-2">
                             {[1,2,3].map(i => <div key={i} className="w-8 h-1 bg-white/40 rounded-full"></div>)}
                          </div>
                       </div>
                    </div>

                    {/* Content Matrix */}
                    <div className="md:w-7/12 flex flex-col space-y-8">
                       <div className="space-y-4">
                         <div className="flex items-center gap-2 text-[10px] font-black text-accent-600 dark:text-accent-400 uppercase tracking-[0.3em]">
                           <i className="fas fa-terminal"></i> Strategic Overview
                         </div>
                         <p className="text-gray-700 dark:text-slate-300 leading-relaxed text-lg font-medium">
                           {item.desc}
                         </p>
                       </div>

                       {/* Industry FAQ Card */}
                       <div className="relative p-6 rounded-[2rem] bg-gray-50 dark:bg-slate-950 border-2 border-gray-100 dark:border-white/5 overflow-hidden group/faq">
                          <div className="absolute -right-4 -top-4 opacity-5 group-hover/faq:opacity-10 transition-opacity">
                             <i className={`fas ${item.icon} text-9xl text-brand-900 dark:text-white`}></i>
                          </div>
                          
                          <div className="relative z-10 space-y-4">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-accent-500/30">
                                   <i className="fas fa-question text-sm"></i>
                                </div>
                                <h5 className="font-black text-brand-900 dark:text-white text-base tracking-tight leading-tight">
                                  {item.faq.q}
                                </h5>
                             </div>
                             <div className="pl-14">
                                <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed font-bold">
                                  {item.faq.a}
                                </p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

            </div>
          )
        })}
      </div>
    </div>
  );
};

export default Industries;