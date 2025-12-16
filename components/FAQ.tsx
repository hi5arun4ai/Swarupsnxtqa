import React, { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 dark:border-slate-700 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-accent-500' : 'text-brand-900 dark:text-white group-hover:text-accent-500'}`}>
          {question}
        </span>
        <span className={`ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'bg-accent-500 border-accent-500 text-white rotate-180' : 'border-gray-300 dark:border-slate-600 text-gray-400'}`}>
           <i className="fas fa-chevron-down text-sm"></i>
        </span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed pr-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How quickly can I deploy Swarups NXT agents?",
      answer: "For standard use cases, our pre-trained voice agents can be deployed within 24-48 hours. If you require a highly customized enterprise solution with deep knowledge base integration and bespoke workflows, it typically takes 5-7 days for full training and testing."
    },
    {
      question: "Do the AI agents really sound human?",
      answer: "Yes, absolutely. We utilize advanced Gemini 2.5 and proprietary neural audio models that capture human nuances like breathing, intonation shifts, and natural pacing. Most customers cannot distinguish our agents from human operators during standard interactions."
    },
    {
      question: "Does it integrate with my existing CRM?",
      answer: "Seamlessly. Swarups NXT offers native one-click integrations for Salesforce, Zoho, HubSpot, Pipedrive, and Slack. We can also connect to any custom tech stack via our robust REST API and Webhooks."
    },
    {
      question: "Is my business data secure?",
      answer: "Security is our top priority. We are SOC2 Type II compliant and use bank-grade AES-256 encryption for all data in transit and at rest. Your data is isolated and never used to train our public models without your explicit written consent."
    },
    {
      question: "What languages do you support?",
      answer: "Our agents currently support over 20 global languages, including English (US, UK, Indian, Australian accents), Hindi, Spanish, French, German, and Mandarin. We are constantly adding new regional dialects to our library."
    },
    {
      question: "How does the pricing model work?",
      answer: "We operate on a transparent subscription model. You pay a base platform fee plus a usage rate per minute of conversation. This typically results in a 60-70% cost reduction compared to hiring, training, and managing a full-time human support team."
    }
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20">
        
        {/* Header Section */}
        <div className="md:w-1/3">
           <div className="sticky top-32">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-bold uppercase tracking-wider mb-4">
                <i className="fas fa-question-circle"></i> FAQ
              </div>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white mb-6">
                Common <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-accent-500">
                   Questions
                </span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
                Everything you need to know about hiring your first digital employee. Can't find the answer you're looking for?
              </p>
              <a 
                href="#contact"
                onClick={(e) => handleScroll(e, 'contact')}
                className="inline-flex items-center gap-2 text-brand-900 dark:text-white font-bold border-b-2 border-accent-500 pb-1 hover:text-accent-500 transition-colors"
              >
                Chat with our team <i className="fas fa-arrow-right text-sm"></i>
              </a>
           </div>
        </div>

        {/* Questions Section */}
        <div className="md:w-2/3">
           <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-md rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-white/50 dark:border-slate-700/50">
             {faqs.map((faq, index) => (
               <FAQItem key={index} question={faq.question} answer={faq.answer} />
             ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default FAQ;