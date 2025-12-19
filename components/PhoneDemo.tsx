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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startConversation();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      const container = chatContainerRef.current;
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const startConversation = () => {
    setMessages([]);
    setIsTyping(true);
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: "Hi! I'm SwarupBot. I'm your new AI growth partner. What's our goal today?",
          sender: 'bot',
          options: [
            { label: "Boost Sales 📈", action: "sales" },
            { label: "See USP 🌟", action: "usp" },
            { label: "Lower Costs 💸", action: "costs" },
            { label: "24/7 Support 🛠️", action: "support" }
          ]
        }
      ]);
      setIsTyping(false);
    }, 1000);
  };

  const handleAction = (action: string, label: string) => {
    if (action === 'book') {
      openModal();
      return;
    }

    setMessages(prev => [...prev, { id: Date.now(), text: label, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
      let botResponse: Message;

      switch (action) {
        case 'sales':
          botResponse = {
            id: Date.now() + 1,
            text: "I qualify every lead instantly. By engaging visitors in 200ms, I prevent 'lead leakage' and book qualified meetings directly to your calendar.",
            sender: 'bot'
          };
          break;
        case 'usp':
          botResponse = {
            id: Date.now() + 1,
            text: "Unlike basic bots, I'm powered by native neural voice intelligence. I understand sentiment, context, and complex business data with 99.8% accuracy.",
            sender: 'bot'
          };
          break;
        case 'costs':
          botResponse = {
            id: Date.now() + 1,
            text: "I cost roughly 10% of a full-time human agent and I never sleep, take breaks, or need benefits. I'm pure efficiency for your bottom line.",
            sender: 'bot'
          };
          break;
        case 'support':
          botResponse = {
            id: Date.now() + 1,
            text: "I can handle thousands of Tier 1 queries simultaneously across web, WhatsApp, and phone. Your human team only gets the complex stuff.",
            sender: 'bot'
          };
          break;
        default:
          botResponse = {
            id: Date.now() + 1,
            text: "That sounds interesting! Want to see how I can integrate with your specific business model?",
            sender: 'bot'
          };
      }

      setMessages(prev => [...prev, botResponse]);
      
      setTimeout(() => {
        setMessages(prev => [...prev, {
            id: Date.now() + 2,
            text: "Should we get a personalized demo ready for you?",
            sender: 'bot',
            options: [
                { label: "Yes, Book Demo 📅", action: "book" },
                { label: "Tell me more first", action: "usp" }
            ]
        }]);
        setIsTyping(false);
      }, 1500);

    }, 1500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const text = inputValue.trim();
    setInputValue("");
    
    setMessages(prev => [...prev, { id: Date.now(), text: text, sender: 'user' }]);
    setIsTyping(true);

    setTimeout(() => {
        let replyText = "";
        let options: { label: string; action: string }[] | undefined = undefined;
        const lowerText = text.toLowerCase();

        if (lowerText.includes("price") || lowerText.includes("cost")) {
            replyText = "Our pricing is flexible based on volume. Typically, we save companies 60-80% on support overhead.";
            options = [{ label: "Check ROI 💰", action: "sales" }];
        } else if (lowerText.includes("demo") || lowerText.includes("book")) {
            replyText = "I can definitely help with that. Let's find a time for your team.";
            options = [{ label: "Open Calendar 📅", action: "book" }];
        } else {
            replyText = "Understood. I'm fine-tuned to help you scale. Would you like to see our industry-specific use cases?";
            options = [
              { label: "See USP 🌟", action: "usp" },
              { label: "Book Demo 📅", action: "book" }
            ];
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
    <div id="chat-bot" className="flex flex-col items-center xl:items-end justify-center w-full">
      <div className="relative group w-full flex justify-center xl:justify-end">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-accent-500/5 rounded-full blur-[80px] pointer-events-none -z-10 animate-pulse"></div>

        {/* Phone Body with pulse animation */}
        <div className="relative w-[280px] sm:w-[320px] h-[580px] sm:h-[640px] bg-gray-950 rounded-[3rem] border-[8px] border-gray-900 shadow-[0_40px_100px_rgba(0,0,0,0.5)] lg:[transform:perspective(1500px)_rotateY(-12deg)_rotateX(4deg)] overflow-hidden transition-all duration-700 hover:[transform:perspective(1500px)_rotateY(-5deg)_rotateX(2deg)] ring-1 ring-white/10">
          
          {/* Dynamic Island Overlay */}
          <div className="absolute top-0 inset-x-0 h-7 bg-black rounded-b-2xl z-30 w-28 sm:w-32 mx-auto flex items-center justify-center gap-1.5 shadow-sm">
              <div className="w-8 sm:w-10 h-1 sm:h-1.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-blue-900/40 rounded-full"></div>
          </div>

          {/* Internal Screen Flow */}
          <div className="w-full h-full flex flex-col pt-8 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
            
            {/* Chat Header */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-4 shadow-sm flex items-center gap-3 border-b border-gray-200 dark:border-slate-700 z-10">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-900 flex items-center justify-center text-white font-black text-[10px] sm:text-xs shadow-lg">SB</div>
              <div>
                <h3 className="font-black text-gray-800 dark:text-white text-[10px] sm:text-xs uppercase tracking-wider">Neural Agent</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-[8px] sm:text-[9px] text-accent-600 dark:text-accent-400 font-black uppercase tracking-[0.2em]">Online</p>
                </div>
              </div>
            </div>

            {/* Messages Container */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth custom-scrollbar bg-gray-50/50 dark:bg-slate-900/50"
            >
              {messages.map((msg) => (
                <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-[11px] sm:text-[13px] leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.05)] border transition-all hover:shadow-lg hover:border-accent-500/30 ${
                    msg.sender === 'user' 
                      ? 'bg-brand-900 text-white rounded-br-none border-transparent' 
                      : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-none border-gray-100 dark:border-slate-700'
                  }`}>
                    {msg.text}
                  </div>
                  
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAction(opt.action, opt.label)}
                          className={`text-[9px] sm:text-[10px] px-3 py-2 rounded-xl transition-all font-black uppercase tracking-widest shadow-[0_4px_10px_rgba(0,0,0,0.1)] active:scale-95 border ${
                            opt.action === 'book'
                              ? 'bg-accent-500 border-accent-400 text-white hover:bg-accent-600 hover:shadow-accent-500/20'
                              : 'bg-white dark:bg-slate-700 text-brand-900 dark:text-accent-400 border-gray-100 dark:border-slate-600 hover:border-accent-500 hover:bg-accent-50/10'
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
                <div className="flex items-start">
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center shadow-sm border border-gray-100 dark:border-slate-700">
                    <span className="w-1 h-1 bg-accent-500 rounded-full animate-bounce"></span>
                    <span className="w-1 h-1 bg-accent-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1 h-1 bg-accent-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input Area */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-8"
            >
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2.5 rounded-2xl shadow-inner border border-gray-200/50 dark:border-white/5 focus-within:border-accent-500/50 transition-all">
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Test its logic..."
                  className="bg-transparent border-none outline-none w-full text-[11px] sm:text-xs text-gray-800 dark:text-white placeholder-gray-400 font-medium"
                />
                <button type="submit" disabled={!inputValue.trim()} className="text-accent-500 transition-transform active:scale-90 disabled:opacity-30 p-1">
                  <i className="fas fa-paper-plane text-sm sm:text-base"></i>
                </button>
              </div>
            </form>

            {/* Physical Home Indicator Bar */}
            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-1 bg-gray-300 dark:bg-gray-700 rounded-full z-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;