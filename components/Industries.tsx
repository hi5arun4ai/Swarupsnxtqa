import React, { useState } from 'react';

interface IndustryData {
  title: string;
  desc: string;
  icon: string;
  image: string;
  color: string;
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
      desc: "Automate property inquiries, schedule viewings 24/7, and qualify buyers before they talk to an agent.",
      icon: "fa-building",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
      color: "from-blue-600 to-blue-900",
      faq: {
        q: "Can the AI really schedule viewings autonomously?",
        a: "Yes. It integrates with your calendar (e.g., Calendly, Zoho) to check availability and book slots instantly without double-booking."
      }
    },
    {
      title: "Healthcare",
      desc: "Manage patient appointments, answer FAQs about services, and send automated reminders with HIPAA-compliant AI.",
      icon: "fa-heart-pulse",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
      color: "from-emerald-500 to-teal-800",
      faq: {
        q: "Is this solution HIPAA compliant?",
        a: "Absolutely. We utilize enterprise-grade encryption and strict access controls to ensure all patient data remains secure and compliant."
      }
    },
    {
      title: "E-Commerce",
      desc: "Recover abandoned carts, track orders instantly, and offer personalized product recommendations via voice or chat.",
      icon: "fa-cart-shopping",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=800&auto=format&fit=crop",
      color: "from-purple-600 to-indigo-900",
      faq: {
        q: "Can it check real-time order status?",
        a: "Yes, it connects directly to platforms like Shopify and WooCommerce to pull real-time tracking numbers and delivery estimates."
      }
    },
    {
      title: "Recruitment",
      desc: "Screen thousands of resumes instantly, conduct initial voice interviews, and schedule meetings with top talent.",
      icon: "fa-users-viewfinder",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=800&auto=format&fit=crop",
      color: "from-orange-500 to-red-800",
      faq: {
        q: "How does the AI conduct interviews?",
        a: "It calls candidates, asks pre-set screening questions, records responses, and even scores them based on keywords and sentiment."
      }
    }
  ];

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white mb-4">
          Industries We <span className="text-accent-500">Transform</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Tailored AI solutions designed to tackle the unique challenges of your sector with precision and empathy.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {useCases.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`group overflow-hidden rounded-3xl transition-all duration-500 border
                ${isOpen 
                  ? 'bg-white dark:bg-slate-800 border-accent-500 shadow-2xl shadow-accent-500/10' 
                  : 'bg-white/50 dark:bg-slate-800/50 border-white/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800'
                }`}
            >
              {/* Header */}
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full p-5 md:p-6 flex items-center gap-4 md:gap-6 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-colors duration-300 shrink-0 ${isOpen ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30' : 'bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 group-hover:bg-accent-100 dark:group-hover:bg-slate-600 group-hover:text-accent-600'}`}>
                  <i className={`fas ${item.icon}`}></i>
                </div>
                
                <div className="flex-1">
                  <h3 className={`text-lg md:text-xl font-bold transition-colors ${isOpen ? 'text-brand-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>
                    {item.title}
                  </h3>
                </div>

                <div className={`w-8 h-8 rounded-full border border-gray-200 dark:border-slate-600 flex items-center justify-center transition-transform duration-500 shrink-0 ${isOpen ? 'rotate-180 bg-accent-500 border-accent-500 text-white' : 'text-gray-400'}`}>
                   <i className="fas fa-chevron-down text-sm"></i>
                </div>
              </button>

              {/* Body */}
              <div 
                className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                 <div className="p-6 pt-0 flex flex-col md:flex-row gap-8">
                    {/* Image Section */}
                    <div className="md:w-5/12 hidden md:block">
                       <div className="relative h-full min-h-[200px] rounded-2xl overflow-hidden shadow-md">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                          <div className={`absolute inset-0 bg-gradient-to-t ${item.color} opacity-60 mix-blend-multiply`}></div>
                       </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-7/12 flex flex-col justify-center space-y-6">
                       <div>
                         <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">The Use Case</h4>
                         <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                           {item.desc}
                         </p>
                       </div>

                       <div className="bg-gray-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-gray-100 dark:border-slate-700">
                          <div className="flex items-start gap-3">
                             <div className="mt-1 text-accent-500 shrink-0">
                                <i className="fas fa-question-circle text-lg"></i>
                             </div>
                             <div>
                                <h5 className="font-bold text-brand-900 dark:text-white text-sm mb-1">{item.faq.q}</h5>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.faq.a}</p>
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