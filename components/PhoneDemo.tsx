import React, { useState, useEffect, useRef } from 'react';

interface PhoneDemoProps {
  openModal: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: { label: string; action: string }[];
}

const PhoneDemo: React.FC<PhoneDemoProps> = ({ openModal }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Initial bot message
  useEffect(() => {
    // Reset on mount
    startConversation();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      const { scrollHeight, clientHeight } = chatContainerRef.current;
      const maxScrollTop = scrollHeight - clientHeight;
      chatContainerRef.current.scrollTo({
        top: maxScrollTop > 0 ? maxScrollTop : 0,
        behavior: 'smooth'
      });
    }
  };

  const startConversation = () => {
    setMessages([]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Hi! I'm SwarupBot. How can I help boost your business today?",
          sender: 'bot',
          options: [
            { label: "Boost Sales 📈", action: "sales" },
            { label: "See USP 🌟", action: "usp" }
          ]
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (action: string, label: string) => {
    // Add user message
    setMessages(prev => [...prev, { id: Date.now(), text: label, sender: 'user' }]);
    setIsTyping(true);

    // Bot response logic
    setTimeout(() => {
      let botResponse: Message;

      if (action === 'sales') {
        botResponse = {
          id: Date.now() + 1,
          text: "I can qualify leads 24/7, schedule meetings, and follow up instantly. Our clients see a 40% increase in conversion rates!",
          sender: 'bot'
        };
      } else {
        botResponse = {
          id: Date.now() + 1,
          text: "We offer enterprise-grade security, bespoke voice models trained on your data, and 24/7 reliability at 60% less cost than human teams.",
          sender: 'bot'
        };
      }

      setMessages(prev => [...prev, botResponse]);
      
      // Follow up with CTA
      setTimeout(() => {
        setMessages(prev => [...prev, {
            id: Date.now() + 2,
            text: "Ready to scale? Let's book a demo so you can see me in action.",
            sender: 'bot',
            options: [
                { label: "Book a Demo 📅", action: "book" }
            ]
        }]);
        setIsTyping(false);
      }, 1500);

    }, 1500);
  };

  const handleAction = (action: string, label: string) => {
    if (action === 'book') {
        openModal();
    } else {
        handleOptionClick(action, label);
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue("");
    
    // Add User Message
    setMessages(prev => [...prev, { id: Date.now(), text: text, sender: 'user' }]);
    setIsTyping(true);

    // Dynamic Reply Logic
    setTimeout(() => {
        let replyText = "";
        let options: { label: string; action: string }[] | undefined = undefined;
        const lowerText = text.toLowerCase();

        if (lowerText.includes("price") || lowerText.includes("cost") || lowerText.includes("expensive")) {
            replyText = "We are very cost-effective! Typically, Swarups NXT agents cost 60% less than hiring a full-time human employee. You can verify this with our ROI calculator below.";
            options = [{ label: "Check ROI 💰", action: "roi" }];
        } else if (lowerText.includes("human") || lowerText.includes("real")) {
            replyText = "I'm an AI, but I'm trained to be indistinguishable from a human agent. I never sleep and I'm always polite!";
        } else if (lowerText.includes("demo") || lowerText.includes("book")) {
            replyText = "That's music to my ears. Let's get you set up with a personalized demo.";
            options = [{ label: "Book Now 📅", action: "book" }];
        } else if (lowerText.includes("support") || lowerText.includes("help")) {
            replyText = "I can handle Tier 1 support tickets, answer FAQs, and escalate complex issues to your human team seamlessly.";
        } else {
            replyText = "That's a great question. Since I'm in 'Demo Mode', I might not have all the specific details for your business yet. Would you like to chat with a human expert?";
            options = [{ label: "Talk to Expert 👨‍💼", action: "book" }];
        }

        setMessages(prev => [...prev, {
            id: Date.now() + 1,
            text: replyText,
            sender: 'bot',
            options: options
        }]);
        setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center gap-16">
        
        {/* Left Side: Copy */}
        <div className="lg:w-1/2 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 text-sm font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse"></span>
            Live Demo
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white">
            Capture Leads <br />
            <span className="text-accent-500">While You Sleep.</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Don't let potential customers wait. SwarupBot engages visitors instantly, answers queries, and books meetings directly into your calendar. It's the ultimate 24/7 sales representative.
          </p>
          <ul className="space-y-4">
            {[
              "Instant response time (under 200ms)",
              "Seamless CRM integration (Zoho, Salesforce)",
              "Handles 1000+ concurrent conversations"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-700 dark:text-gray-200">
                <i className="fas fa-check-circle text-accent-500 text-xl"></i>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: 3D Phone Mockup */}
        <div className="lg:w-1/2 flex justify-center perspective-1000">
          {/* 
             Wrapper for float animation 
             Added group for hover detection on container
          */}
          <div className="animate-float group relative">
            {/* Ambient Back Glow - Enhanced Pulse on Hover */}
            <div className="absolute -inset-1 bg-accent-500/20 rounded-[3.5rem] blur-xl animate-pulse transition-all duration-500 group-hover:bg-accent-500/40 group-hover:blur-2xl"></div>

            <div className="relative w-[320px] h-[640px] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl shadow-brand-900/40 
                            transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden
                            transform [transform-style:preserve-3d] 
                            [transform:perspective(1000px)_rotateY(-15deg)_rotateX(5deg)]
                            group-hover:[transform:perspective(1000px)_rotateY(0deg)_rotateX(0deg)_scale(1.02)]
                            group-hover:shadow-[0_0_40px_-5px_rgba(43,182,198,0.5)]
                            group-hover:border-gray-700
                            ring-1 ring-white/10 group-hover:ring-accent-500/50">
              
              {/* Gloss Reflection Overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-transparent z-30 rounded-[2.5rem] opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>

              {/* Dynamic Island / Notch */}
              <div className="absolute top-0 inset-x-0 h-7 bg-black rounded-b-2xl z-20 w-36 mx-auto flex items-center justify-center gap-2">
                  {/* Sensors */}
                  <div className="w-12 h-1.5 bg-gray-800 rounded-full"></div>
                  <div className="w-1.5 h-1.5 bg-blue-900/50 rounded-full"></div>
              </div>

              {/* Screen Content */}
              <div 
                className="w-full h-full flex flex-col pt-8 relative bg-cover bg-center"
                style={{ 
                    backgroundImage: `url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=600&auto=format&fit=crop')` 
                }}
              >
                {/* Wallpaper Overlay for Readability */}
                <div className="absolute inset-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-[2px]"></div>

                {/* Content Container (z-index to sit above overlay) */}
                <div className="relative z-10 flex flex-col h-full">

                    {/* Chat Header */}
                    <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-4 shadow-sm flex items-center gap-3 border-b border-gray-100 dark:border-slate-800">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-md">
                            SB
                        </div>
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-800 dark:text-white text-sm">SwarupBot</h3>
                        <p className="text-xs text-accent-500 font-medium">
                        Automated Agent
                        </p>
                    </div>
                    <div className="ml-auto text-gray-400">
                        <i className="fas fa-ellipsis-v"></i>
                    </div>
                    </div>

                    {/* Chat Messages */}
                    <div 
                        ref={chatContainerRef}
                        className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
                    >
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                        <div 
                            className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed transition-all duration-300 hover:scale-[1.02] cursor-pointer relative z-0
                            shadow-sm hover:shadow-lg border
                            ${
                            msg.sender === 'user' 
                                ? 'bg-brand-900 text-white rounded-br-none border-transparent hover:border-blue-400/30 hover:shadow-brand-900/30' 
                                : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100 rounded-bl-none border-gray-100 dark:border-slate-600 hover:border-accent-400/40 hover:shadow-accent-500/20'
                            }`}
                        >
                            {msg.text}
                        </div>
                        
                        {/* Options Buttons */}
                        {msg.options && (
                            <div className="mt-2 flex flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                            {msg.options.map((opt, idx) => (
                                <button
                                key={idx}
                                onClick={() => handleAction(opt.action, opt.label)}
                                className={`text-xs px-3 py-1.5 rounded-full transition-all shadow-sm hover:shadow-lg hover:scale-105 active:scale-95 border border-transparent
                                ${opt.action === 'book'
                                    ? 'bg-accent-500 text-white font-bold hover:bg-accent-600 shadow-md shadow-accent-500/30 hover:shadow-[0_0_10px_rgba(43,182,198,0.6)] hover:border-accent-300'
                                    : 'bg-white dark:bg-slate-800 text-accent-700 dark:text-accent-300 hover:bg-accent-50 dark:hover:bg-slate-700 hover:border-accent-400/50'
                                }`}
                                >
                                {opt.label}
                                </button>
                            ))}
                            </div>
                        )}
                        </div>
                    ))}
                    
                    {isTyping && (
                        <div className="flex items-start animate-pulse">
                        <div className="bg-gray-200 dark:bg-slate-700 p-3 rounded-2xl rounded-bl-none flex gap-1 items-center h-10 shadow-sm border border-transparent">
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-100"></span>
                            <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce delay-200"></span>
                        </div>
                        </div>
                    )}
                    </div>

                    {/* Chat Input Placeholder */}
                    <form 
                    onSubmit={handleSendMessage}
                    className="p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-gray-200 dark:border-slate-700 pb-6" // Added pb-6 for home indicator clearance
                    >
                    <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2 rounded-full text-gray-800 dark:text-gray-100 text-sm focus-within:ring-2 focus-within:ring-accent-500 transition-all shadow-inner">
                        <input 
                            type="text" 
                            value={inputValue} 
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Type a message..."
                            className="bg-transparent border-none outline-none w-full placeholder-gray-400 dark:placeholder-gray-500 text-gray-800 dark:text-white"
                        />
                        <button 
                            type="submit" 
                            disabled={!inputValue.trim()}
                            className={`${inputValue.trim() ? 'text-accent-500 cursor-pointer hover:scale-110' : 'text-gray-400 cursor-default'} transition-all`}
                        >
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    </form>
                
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 dark:bg-gray-600 rounded-full z-20"></div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;