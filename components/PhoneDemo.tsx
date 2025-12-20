import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface PhoneDemoProps {
  openModal: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  options?: { label: string; action: string }[];
}

const SYSTEM_INSTRUCTION = `You are the official Swarupsnxt Chatbot. Your goal is to provide helpful, professional, and friendly information about Swarupsnxt's services, mission, and general inquiries.

## Tone and Style
- Professional, innovative, and customer-centric.
- Use clear language. Format with bullet points if the answer is long.
- Keep responses concise but complete.`;

const DEFAULT_OPTIONS = [
  { label: "Our Services 🤖", action: "services" },
  { label: "Boost Sales 🚀", action: "boost" },
  { label: "See USP 💎", action: "usp" },
  { label: "Book a Demo 📅", action: "book" }
];

const PhoneDemo: React.FC<PhoneDemoProps> = ({ openModal }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatHistoryRef = useRef<{ role: string; parts: { text: string }[] }[]>([]);

  useEffect(() => {
    startConversation("Hi! I'm the official Swarupsnxt Assistant. I can help you understand how our AI Digital Employees can scale your business.");
    
    const handleExternalInitiate = () => {
      setIsFocused(true);
      const timer = setTimeout(() => setIsFocused(false), 3000);
      return () => clearTimeout(timer);
    };
    
    window.addEventListener('nxt-initiate-chat', handleExternalInitiate);
    return () => window.removeEventListener('nxt-initiate-chat', handleExternalInitiate);
  }, []);

  // Optimized Scroll Handler using scrollIntoView
  useEffect(() => {
    const scrollToBottom = () => {
      if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ 
          behavior: messages.length <= 1 ? "auto" : "smooth",
          block: "nearest"
        });
      }
    };

    // Small timeout ensures the DOM has updated and calculated new element heights
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, [messages, isTyping]);

  const startConversation = (greetingText: string) => {
    setMessages([]);
    setIsTyping(true);
    chatHistoryRef.current = [];
    
    setTimeout(() => {
      const firstMsg: Message = {
        id: Date.now(),
        text: greetingText,
        sender: 'bot',
        options: DEFAULT_OPTIONS
      };
      setMessages([firstMsg]);
      chatHistoryRef.current = [{ role: "model", parts: [{ text: firstMsg.text }] }];
      setIsTyping(false);
    }, 400); 
  };

  const getGeminiResponse = async (userText: string) => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) return "I'm in standalone mode. Please configure the system API key.";

    try {
      const ai = new GoogleGenAI({ apiKey });
      chatHistoryRef.current.push({ role: "user", parts: [{ text: userText }] });

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: chatHistoryRef.current,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          maxOutputTokens: 1000,
          temperature: 0.7,
          thinkingConfig: { thinkingBudget: 0 }
        }
      });

      const textParts = response.candidates?.[0]?.content?.parts
        ?.filter(part => 'text' in part)
        .map(part => part.text);
      
      const reply = textParts?.join('') || "I'm analyzing your request. How else can I help you?";
      chatHistoryRef.current.push({ role: "model", parts: [{ text: reply }] });
      return reply;
    } catch (e) {
      return "Encountered a signal interruption. Contact hello@swarupsnxt.com for support.";
    }
  };

  const handleAction = async (action: string, label: string) => {
    if (action === 'book') {
      openModal();
      return;
    }
    setMessages(prev => [...prev, { id: Date.now(), text: label, sender: 'user' }]);
    setIsTyping(true);
    const botReply = await getGeminiResponse(label);
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      text: botReply,
      sender: 'bot',
      options: DEFAULT_OPTIONS.filter(opt => opt.action !== action)
    }]);
    setIsTyping(false);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;
    const text = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { id: Date.now(), text: text, sender: 'user' }]);
    setIsTyping(true);
    const botReply = await getGeminiResponse(text);
    setMessages(prev => [...prev, {
      id: Date.now() + 1,
      text: botReply,
      sender: 'bot'
    }]);
    setIsTyping(false);
  };

  const disableAnimations = isInteracting || isTyping || inputValue.length > 0;

  return (
    <div className="flex flex-col items-center xl:items-end justify-center w-full">
      <div className="relative group w-full flex justify-center xl:justify-end">
        {/* Ambient Glow */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-[80px] pointer-events-none -z-10 transition-opacity duration-1000 ${isFocused && !disableAnimations ? 'opacity-100 bg-accent-500/30' : 'opacity-20 bg-accent-500/5'}`}></div>

        <div 
          id="chat-bot"
          style={{ 
            backfaceVisibility: 'hidden', 
            WebkitBackfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d' 
          }}
          className={`relative w-[280px] sm:w-[320px] h-[580px] sm:h-[640px] bg-gray-950 rounded-[3rem] border-[8px] border-gray-900 shadow-[0_40px_100px_rgba(0,0,0,0.5)] overflow-hidden ring-1 ring-white/10 will-change-transform transition-[transform,shadow,ring] duration-700
          ${!disableAnimations 
            ? 'lg:[transform:perspective(1500px)_rotateY(-12deg)_rotateX(4deg)] hover:[transform:perspective(1500px)_rotateY(-5deg)_rotateX(2deg)] hover:animate-soft-pulse' 
            : 'lg:[transform:perspective(1500px)_rotateY(0)_rotateX(0)] shadow-2xl scale-100'
          }
          ${isFocused && !disableAnimations ? 'ring-4 ring-accent-500 ring-offset-4 dark:ring-offset-slate-900 animate-focus-pulse' : ''}`}
        >
          {/* Hardware Notch */}
          <div className="absolute top-0 inset-x-0 h-7 bg-black rounded-b-2xl z-30 w-28 sm:w-32 mx-auto flex items-center justify-center gap-1.5">
              <div className="w-8 sm:w-10 h-1 sm:h-1.5 bg-gray-800 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-blue-900/40 rounded-full"></div>
          </div>

          <div className="w-full h-full flex flex-col pt-8 bg-slate-50 dark:bg-slate-900 overflow-hidden relative">
            {/* Header */}
            <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-md p-4 shadow-sm flex items-center gap-3 border-b border-gray-200 dark:border-slate-700 z-10 shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-900 flex items-center justify-center text-white font-black text-[10px] sm:text-xs">NX</div>
              <div>
                <h3 className="font-black text-gray-800 dark:text-white text-[10px] sm:text-xs uppercase tracking-wider">Swarupsnxt Bot</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-[8px] sm:text-[9px] text-accent-600 dark:text-accent-400 font-black uppercase tracking-widest">Online</p>
                </div>
              </div>
            </div>

            {/* Chat Messages Container */}
            <div 
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 dark:bg-slate-900/50 custom-scrollbar overscroll-contain flex flex-col min-h-0"
              style={{ scrollBehavior: 'smooth' }}
            >
              {messages.map((msg, index) => (
                <div key={msg.id} className={`flex flex-col flex-shrink-0 ${msg.sender === 'user' ? 'items-end' : 'items-start'} ${index === messages.length - 1 ? 'animate-fade-in-up' : ''} w-full`}>
                  <div className={`max-w-[92%] p-3.5 sm:p-4 rounded-2xl text-[12px] sm:text-[14px] leading-relaxed shadow-md border-2 transition-all duration-300 h-auto min-h-fit break-words whitespace-pre-wrap ${
                    msg.sender === 'user' 
                      ? 'bg-brand-900 text-white rounded-br-none border-transparent ml-auto' 
                      : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-100 rounded-bl-none border-gray-100 dark:border-slate-700 mr-auto'
                  } ${!isTyping ? 'hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-500/30 hover:scale-[1.01]' : ''}`}>
                    {msg.text}
                  </div>
                  
                  {msg.options && (
                    <div className="mt-3 flex flex-wrap gap-2 w-full justify-start pb-2 flex-shrink-0">
                      {msg.options.map((opt, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAction(opt.action, opt.label)}
                          className={`text-[9px] sm:text-[10px] px-3 py-2 rounded-xl transition-all font-black uppercase tracking-widest shadow-md active:scale-95 border-2 ${
                            opt.action === 'book'
                              ? 'bg-accent-500 border-accent-400 text-white hover:bg-accent-600'
                              : 'bg-white dark:bg-slate-700 text-brand-900 dark:text-accent-400 border-gray-100 dark:border-slate-600 hover:border-accent-500'
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
                <div className="flex items-start flex-shrink-0">
                  <div className="bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-none flex gap-1.5 items-center shadow-sm border border-gray-100 dark:border-slate-700 animate-pulse">
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full"></span>
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full opacity-60"></span>
                    <span className="w-1.5 h-1.5 bg-accent-500 rounded-full opacity-30"></span>
                  </div>
                </div>
              )}
              
              {/* Invisible anchor for scroll tracking */}
              <div ref={messagesEndRef} className="h-2 w-full flex-shrink-0" aria-hidden="true" />
            </div>

            {/* Input Form */}
            <form 
              onSubmit={handleSendMessage}
              className="p-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 pb-8 shrink-0"
            >
              <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-800 px-4 py-2.5 rounded-2xl border-2 border-gray-200/50 dark:border-white/5 focus-within:border-accent-500/50 transition-all shadow-inner">
                <input 
                  type="text" 
                  value={inputValue} 
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsInteracting(true)}
                  onBlur={() => setIsInteracting(false)}
                  placeholder="Ask me anything..."
                  className="bg-transparent border-none outline-none w-full text-[12px] text-gray-800 dark:text-white placeholder-gray-400 font-bold"
                />
                <button type="submit" disabled={!inputValue.trim() || isTyping} className="text-accent-500 transition-transform active:scale-90 disabled:opacity-30">
                  <i className="fas fa-paper-plane text-base"></i>
                </button>
              </div>
            </form>

            <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-20 sm:w-28 h-1 bg-gray-300 dark:bg-gray-700 rounded-full z-30"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneDemo;