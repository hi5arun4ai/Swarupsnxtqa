import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const VoiceStudio: React.FC = () => {
  const [industry, setIndustry] = useState('Real Estate');
  const [language, setLanguage] = useState('Indian English');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [personaKey, setPersonaKey] = useState('neutral');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [mode, setMode] = useState<'template' | 'custom'>('template');
  const [customPrompt, setCustomPrompt] = useState('');
  const [generatedScript, setGeneratedScript] = useState('');
  const [statusLogs, setStatusLogs] = useState<string[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const visualizerDataArrayRef = useRef<Uint8Array | null>(null);
  const particlesRef = useRef<any[]>([]);
  const currentRequestId = useRef<number>(0);

  const INDUSTRIES = ['Real Estate', 'Healthcare', 'Banking', 'Finance', 'E-commerce', 'EdTech'];
  const LANGUAGES = ['Indian English', 'US English', 'Hindi', 'Tamil', 'Telugu'];
  
  const PERSONAS = {
    enthusiastic: {
      name: 'Enthusiastic',
      icon: 'fa-bolt',
      voices: { female: 'Kore', male: 'Fenrir' },
      directive: 'Speak with high energy, excitement, and a bright, friendly smile in your voice. Use rising intonations and a fast, punchy pace.',
      fallbackParams: { pitch: 1.3, rate: 1.2 }
    },
    assertive: {
      name: 'Assertive',
      icon: 'fa-user-tie',
      voices: { female: 'Kore', male: 'Fenrir' },
      directive: 'Speak with authority, confidence, and a professional, commanding tone. Use steady, downward intonations to emphasize power.',
      fallbackParams: { pitch: 1.0, rate: 1.05 }
    },
    calm: {
      name: 'Calm & Caring',
      icon: 'fa-leaf',
      voices: { female: 'Zephyr', male: 'Puck' },
      directive: 'Speak softly, slowly, and with deep empathy and reassurance. Keep the tone warm, gentle, and breathy.',
      fallbackParams: { pitch: 0.9, rate: 0.8 }
    },
    neutral: {
      name: 'Efficiency Pro',
      icon: 'fa-robot',
      voices: { female: 'Kore', male: 'Puck' },
      directive: 'Speak with a neutral, clear, and highly efficient informative tone. Maintain a flat, professional, and rhythmic delivery.',
      fallbackParams: { pitch: 1.0, rate: 1.0 }
    }
  };

  const SCRIPTS: Record<string, Record<string, string>> = {
    'Real Estate': {
      'Indian English': "Hi there! This is Swarup from Luxury Homes. I'm following up on your inquiry about the park-facing apartments. Would you like to schedule a virtual tour this weekend?",
      'US English': "Hello! This is a follow-up from the premium realty group regarding the listings you saved. Is there a specific property you'd like more details on?",
      'Hindi': "नमस्ते! मैं लक्ज़री होम्स से बात कर रही हूँ। आपने हमारे नए अपार्टमेंट्स के बारे में पूछा था। क्या हम इस बारे में बात कर सकते हैं?",
      'Tamil': "வணக்கம்! நான் லக்சுரி ஹோம்ஸிலிருந்து அழைக்கிறேன். நீங்கள் கேட்ட புதிய வீடுகள் பற்றிய தகவல்கள் என்னிடம் உள்ளன.",
      'Telugu': "నమస్కారం! లగ్జరీ హోమ్స్ నుండి స్వరూప్ మాట్లాడుతున్నాను. మీరు అడిగిన అపార్ట్‌మెంట్ల వివరాలు నా దగ్గర ఉన్నాయి. మీరు ఈ వారాంతంలో చూడాలనుకుంటున్నారా?"
    },
    'Healthcare': {
      'Indian English': "Good morning. I'm calling from Apollo Wellness to confirm your health checkup tomorrow at 10 AM. Please remember to fast for 8 hours before the test.",
      'US English': "Hi, this is a reminder for your upcoming appointment with the specialist. Please arrive 15 minutes early to complete your paperwork.",
      'Hindi': "नमस्ते, मैं आपके कल के हेल्थ चेकअप की पुष्टि करने के लिए कॉल कर रही हूँ। कृपया समय पर पहुँचें।",
      'Tamil': "வணக்கம், நாளை உங்கள் மருத்துவ பரிசோதனை இருப்பதை உறுதி செய்ய அழைக்கிறேன். தயவுசெய்து குறித்த நேரத்திற்கு வரவும்.",
      'Telugu': "నమస్కారం, అపోలో వెల్‌నెస్ నుండి మీ రేపటి హెల్త్ చెకప్ గురించి కాల్ చేస్తున్నాను. దయచేసి ఎనిమిది గంటల ముందు నుండి ఏమీ తినకండి."
    },
    'Banking': {
      'Indian English': "Hello! I'm calling from NXT Bank. We've detected an unauthorized attempt on your credit card. Did you just authorize a transaction of five thousand rupees?",
      'US English': "This is an urgent notification regarding your account security. We have blocked a suspicious login attempt from a new device.",
      'Hindi': "नमस्ते, हम आपके बैंक खाते की सुरक्षा के लिए कॉल कर रहे हैं। क्या आपने अभी कोई ट्रांजेक्शन किया है?",
      'Tamil': "வணக்கம், உங்கள் வங்கி கணக்கின் பாதுகாப்பு குறித்து அழைக்கிறோம். சந்தேகத்திற்கிடமான பரிவர்த்தனை ఏதேனும் நடந்ததா?",
      'Telugu': "నమస్కారం, మేము ఎన్ఎక్స్టీ బ్యాంక్ నుండి మాట్లాడుతున్నాము. మీ క్రెడిట్ కార్డ్ పై అనుమానాస్పద లావాదేవీని గుర్తించాము."
    },
    'Finance': {
      'Indian English': "Hello, this is Swarup from NXT Finance. I'm calling to discuss the customized wealth management plan we've drafted for your portfolio.",
      'US English': "Hi, this is NXT Finance calling regarding your recent loan application status. We have some updates for you.",
      'Hindi': "नमस्ते, मैं NXT फाइनेंस से बात कर रहा हूँ। आपके लोन एप्लिकेशन के बारे में कुछ अपडेट्स हैं।",
      'Tamil': "வணக்கம், நான் NXT பைனான்ஸிலிருந்து அழைக்கிறேன். உங்கள் கடன் விண்ணப்பம் குறித்த தகவல்கள் என்னிடம் உள்ளன.",
      'Telugu': "నమస్కారం, నేను ఎన్ఎక్స్టీ ఫైనాన్స్ నుండి మాట్లాడుతున్నాను. మీ లోన్ అప్లికేషన్ గురించి అప్‌డేట్స్ ఉన్నాయి."
    },
    'E-commerce': {
      'Indian English': "Hi! Your order from StyleCart is out for delivery today. Our agent will reach your location within the next two hours.",
      'US English': "Hey there! Your recent package has been successfully delivered. We hope you love your purchase! Would you like to leave a review?",
      'Hindi': "नमस्ते! आपका ऑर्डर आज डिलीवर होने वाला है। हमारा एजेंट जल्द ही आपका सामान लाएगा।",
      'Tamil': "வணக்கம்! உங்கள் ஆர்டர் இன்று டெலிவரி செய்யப்பட உள்ளது. விரைவில் உங்களை வந்தடையும்.",
      'Telugu': "నమస్కారం! స్టైల్‌కార్ట్ నుండి మీ ఆర్డర్ ఈ రోజు డెలివరీ చేయబడుతుంది. మా ఏజెంట్ రెండు గంటల్లో వస్తారు."
    },
    'EdTech': {
      'Indian English': "Hi! I noticed you completed the basic Python module. Would you be interested in a trial session for our Advanced AI certification?",
      'US English': "Hello! Congrats on finishing your course. We have a personalized career guidance session available for you this Friday.",
      'Hindi': "नमस्ते! आपने अपना कोर्स पूरा कर लिया है, इसके लिए बधाई। क्या आप अगले लेवल के लिए डेमो क्लास लेना चाहेंगे?",
      'Tamil': "வணக்கம்! உங்கள் படிப்பை முடித்ததற்கு வாழ்த்துகள். அடுத்த கட்ட பயிற்சி பற்றி பேசலாமா?",
      'Telugu': "నమస్కారం! మీరు మీ పైథాన్ కోర్సును విజయవంతంగా పూర్తి చేసినందుకు అభినందనలు. మీరు అడ్వాన్స్‌డ్ AI సెషన్ లో చేరాలనుకుంటున్నారా?"
    }
  };

  const getScript = () => {
    const ind = SCRIPTS[industry] || SCRIPTS['Real Estate'];
    return ind[language] || ind['Indian English'] || "Connection established. Ready to communicate.";
  };

  const initParticles = (width: number, height: number) => {
    const pts = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      pts.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.2,
        vy: (Math.random() - 0.5) * 1.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1
      });
    }
    particlesRef.current = pts;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      let audioLevel = 0;

      if (isPlaying && analyserRef.current && visualizerDataArrayRef.current) {
        analyserRef.current.getByteFrequencyData(visualizerDataArrayRef.current);
        const sum = visualizerDataArrayRef.current.reduce((a, b) => a + b, 0);
        audioLevel = sum / (visualizerDataArrayRef.current.length * 1.2);
      } else if (isBuffering) {
        audioLevel = 15 + Math.sin(Date.now() / 80) * 12;
      }

      ctx.lineWidth = 0.5;
      const pts = particlesRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        const speedMultiplier = 1 + (audioLevel / 12);
        p.x += p.vx * speedMultiplier;
        p.y += p.vy * speedMultiplier;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * (1 + audioLevel / 25), 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(34, 211, 238, ${p.opacity})` : `rgba(30, 38, 110, ${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const p2 = pts[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const lineOpacity = (1 - dist / 85) * 0.2 * (1 + audioLevel / 12);
            ctx.strokeStyle = isDark ? `rgba(34, 211, 238, ${lineOpacity})` : `rgba(30, 38, 110, ${lineOpacity})`;
            ctx.stroke();
          }
        }
      }

      const coreSize = 30 + (audioLevel / 1.5);
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, coreSize * 4);
      
      if (isPlaying) {
        gradient.addColorStop(0, isDark ? 'rgba(34, 211, 238, 0.8)' : 'rgba(43, 182, 198, 0.8)');
        gradient.addColorStop(0.2, isDark ? 'rgba(34, 211, 238, 0.1)' : 'rgba(43, 182, 198, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else if (isBuffering) {
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.7)');
        gradient.addColorStop(0.2, 'rgba(168, 85, 247, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        gradient.addColorStop(0, isDark ? 'rgba(51, 65, 85, 0.1)' : 'rgba(203, 213, 225, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }

      ctx.beginPath();
      ctx.arc(centerX, centerY, coreSize * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, isBuffering]);

  const addLog = (msg: string) => {
    setStatusLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg.toUpperCase()}`, ...prev.slice(0, 1)]);
  };

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext): Promise<AudioBuffer> => {
    try { 
      return await ctx.decodeAudioData(data.buffer.slice(0)); 
    } catch (e) {
      const dataInt16 = new Int16Array(data.buffer);
      const buffer = ctx.createBuffer(1, dataInt16.length, 24000);
      const channelData = buffer.getChannelData(0);
      for (let i = 0; i < dataInt16.length; i++) channelData[i] = dataInt16[i] / 32768.0;
      return buffer;
    }
  };

  const stopAudio = () => {
    currentRequestId.current += 1;
    if (sourceRef.current) {
      try { sourceRef.current.stop(); } catch (e) {}
      sourceRef.current = null;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsBuffering(false);
  };

  const speakWithGenAI = async (text: string) => {
    const reqId = ++currentRequestId.current;
    const apiKey = process.env.API_KEY;
    const persona = PERSONAS[personaKey as keyof typeof PERSONAS];
    
    if (!apiKey) {
      addLog("API KEY MISSING. FALLING BACK.");
      speakWithFallback(text); 
      return; 
    }
    
    setIsBuffering(true);
    addLog(`ENCODING VOCAL SIGNAL...`);

    try {
      const ai = new GoogleGenAI({ apiKey });
      const voiceName = persona.voices[gender];
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ 
          parts: [{ 
            text: `Persona: ${persona.name}. Tone: ${persona.directive}. Text: ${text}` 
          }] 
        }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { 
            voiceConfig: { 
              prebuiltVoiceConfig: { voiceName: voiceName as any } 
            } 
          }
        }
      });
      
      if (reqId !== currentRequestId.current) return;

      const base64Audio = response.candidates?.[0]?.content?.parts?.find(p => p.inlineData)?.inlineData?.data;
      
      if (!base64Audio) {
        addLog("SIGNAL CORRUPTED. FALLBACK.");
        speakWithFallback(text);
        return;
      }
      
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') await ctx.resume();
      
      const buffer = await decodeAudioData(decode(base64Audio), ctx);
      
      if (reqId !== currentRequestId.current) return;

      if (!analyserRef.current) {
        analyserRef.current = ctx.createAnalyser();
        analyserRef.current.fftSize = 64;
        visualizerDataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      }
      
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
      source.onended = () => { 
        if (reqId === currentRequestId.current) {
          setIsPlaying(false); 
          addLog("TRANSMISSION IDLE."); 
        }
      };
      sourceRef.current = source;
      
      addLog("STREAMING NEURAL VOICE...");
      setIsBuffering(false);
      setIsPlaying(true);
      source.start();
    } catch (e) {
      console.error("GenAI TTS Failed:", e);
      addLog("ERROR. FALLBACK ACTIVE.");
      speakWithFallback(text);
    }
  };

  const speakWithFallback = (text: string) => {
    setIsBuffering(false);
    const persona = PERSONAS[personaKey as keyof typeof PERSONAS];
    addLog("OS SYNTHESIS OVERRIDE.");
    const utter = new SpeechSynthesisUtterance(text);
    
    utter.pitch = (gender === 'female' ? 1.2 : 0.8) * persona.fallbackParams.pitch;
    utter.rate = persona.fallbackParams.rate;
    
    utter.onstart = () => setIsPlaying(true);
    utter.onend = () => { setIsPlaying(false); addLog("TRANSMISSION IDLE."); };
    utter.onerror = () => setIsPlaying(false);
    window.speechSynthesis.speak(utter);
  };

  const handleAction = async () => {
    if (isPlaying || isBuffering) { stopAudio(); return; }
    
    const reqId = ++currentRequestId.current;

    if (mode === 'template') {
      const script = getScript();
      setGeneratedScript('');
      speakWithGenAI(script);
    } else {
      if (!customPrompt.trim()) {
        addLog("INPUT REQUIRED.");
        return;
      }
      
      setIsBuffering(true);
      addLog("NEGOTIATING LOGIC...");
      
      const apiKey = process.env.API_KEY;
      const persona = PERSONAS[personaKey as keyof typeof PERSONAS];
      
      try {
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          
          const gen = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: {
              parts: [{
                text: `You are an AI sales engineer. Persona: ${persona.name}. Target: ${industry}. Input: "${customPrompt}". Write a 1-sentence professional pitch (max 18 words). No emojis. Text only.`
              }]
            }
          });
          
          if (reqId !== currentRequestId.current) return;

          const scriptText = gen.text?.trim() || customPrompt;
          setGeneratedScript(scriptText);
          addLog("LOGIC SECURED.");
          
          await speakWithGenAI(scriptText);
        } else {
          setGeneratedScript(customPrompt);
          speakWithFallback(customPrompt);
        }
      } catch (e) { 
        console.error("Logic Forge Failed:", e);
        setIsBuffering(false);
        addLog("LOGIC TIMEOUT.");
        setGeneratedScript(customPrompt);
        speakWithFallback(customPrompt);
      }
    }
  };

  // Add listener for external triggers
  useEffect(() => {
    const handleTrigger = () => {
      if (!isPlaying && !isBuffering) {
        handleAction();
      }
    };
    window.addEventListener('nxt-trigger-voice', handleTrigger);
    return () => window.removeEventListener('nxt-trigger-voice', handleTrigger);
  }, [isPlaying, isBuffering, mode, industry, language, gender, personaKey]);

  return (
    <div id="voice-studio" className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-3xl rounded-[3rem] p-4 md:p-8 border-2 border-white/50 dark:border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.1)] flex flex-col gap-6 h-full transition-all">
      
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-accent-500 flex items-center justify-center text-white shadow-lg shadow-accent-500/20">
              <i className="fas fa-brain animate-pulse"></i>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
          </div>
          <div>
            <h3 className="text-xs font-black text-brand-900 dark:text-white uppercase tracking-[0.3em]">Vocal Engine</h3>
            <p className="text-[8px] font-bold text-accent-600 dark:text-accent-400 uppercase tracking-widest">NXT-Core-Alpha</p>
          </div>
        </div>
        
        <div className="bg-gray-100 dark:bg-slate-950 p-1 rounded-xl flex border border-gray-200 dark:border-slate-700 shadow-inner">
          {['template', 'custom'].map(m => (
            <button 
              key={m}
              onClick={() => { setMode(m as any); stopAudio(); setGeneratedScript(''); }}
              className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-lg transition-all ${mode === m ? 'bg-white dark:bg-slate-800 text-brand-900 dark:text-accent-400 shadow-sm border border-gray-200 dark:border-slate-700' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1">
        <div className="lg:w-1/2 flex flex-col gap-4">
          <div className="bg-gray-50/50 dark:bg-slate-950/40 rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 flex flex-col gap-5">
            {mode === 'template' ? (
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Sector Matrix</label>
                    <i className="fas fa-microchip text-[10px] text-accent-500/50"></i>
                  </div>
                  <select 
                    value={industry} 
                    onChange={(e) => { setIndustry(e.target.value); stopAudio(); }}
                    className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-500/20 transition-all appearance-none"
                  >
                    {INDUSTRIES.map(i => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center px-1">
                    <label className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Dialect Node</label>
                    <i className="fas fa-globe text-[10px] text-accent-500/50"></i>
                  </div>
                  <select 
                    value={language} 
                    onChange={(e) => { setLanguage(e.target.value); stopAudio(); }}
                    className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl px-4 py-3 text-xs font-bold text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-500/20 transition-all appearance-none"
                  >
                    {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            ) : (
              <div className="space-y-1.5 flex-1 flex flex-col">
                <div className="flex justify-between items-center px-1">
                  <label className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Script Forge</label>
                  <i className="fas fa-terminal text-[10px] text-accent-500/50"></i>
                </div>
                <textarea 
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Ask me to pitch your specific product..."
                  className="w-full flex-1 min-h-[100px] bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-4 text-xs font-bold text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-accent-500/20 transition-all resize-none shadow-inner"
                />
              </div>
            )}

            <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest">Vocal Signature</label>
                <div className="flex bg-gray-100 dark:bg-slate-800 p-1 rounded-xl border border-gray-200 dark:border-slate-700">
                  <button 
                    onClick={() => { setGender('female'); stopAudio(); }}
                    className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${gender === 'female' ? 'bg-brand-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Female
                  </button>
                  <button 
                    onClick={() => { setGender('male'); stopAudio(); }}
                    className={`px-3 py-1 text-[8px] font-black uppercase tracking-widest rounded-lg transition-all ${gender === 'male' ? 'bg-brand-900 text-white shadow-md' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    Male
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(PERSONAS).map(([key, v]) => (
                  <button 
                    key={key}
                    onClick={() => { setPersonaKey(key); stopAudio(); }}
                    className={`relative p-3 rounded-2xl text-[9px] font-black border transition-all flex flex-col items-start gap-1 group/voice ${personaKey === key ? 'bg-brand-900 border-brand-900 text-white shadow-xl shadow-brand-900/20' : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-800 text-gray-500 hover:border-accent-500/30'}`}
                  >
                    <div className="flex items-center gap-2">
                        <i className={`fas ${v.icon} ${personaKey === key ? 'text-accent-400' : 'text-gray-300'}`}></i>
                        <span>{v.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-slate-950 rounded-2xl p-4 font-mono text-[8px] text-accent-500/80 border border-white/5 h-12 flex items-center justify-between overflow-hidden">
             <div className="flex gap-2">
                <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-ping"></span>
                {statusLogs.map((log, idx) => <span key={idx} className="whitespace-nowrap overflow-hidden text-ellipsis">{log}</span>)}
             </div>
          </div>
        </div>

        <div className="lg:w-1/2 relative rounded-[2.5rem] bg-gray-50/50 dark:bg-slate-950/50 border border-gray-100 dark:border-white/5 overflow-hidden flex flex-col items-center justify-center p-8 min-h-[400px] group/hud">
          <div className="absolute inset-0 pointer-events-none">
             <canvas ref={canvasRef} className="w-full h-full opacity-60 group-hover/hud:opacity-100 transition-opacity duration-1000" />
          </div>

          <div className="relative z-10 flex flex-col items-center justify-center h-full w-full gap-8">
            <button 
              onClick={handleAction}
              disabled={isBuffering && mode === 'template'}
              className={`relative w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-700 transform hover:scale-110 active:scale-95 group/main-node
              ${isPlaying || isBuffering 
                ? 'bg-white dark:bg-slate-800 border-2 border-accent-400 shadow-[0_0_60px_rgba(34,211,238,0.4)]' 
                : 'bg-brand-900 dark:bg-slate-800 border-2 border-transparent shadow-2xl shadow-brand-900/30'}`}
            >
              <div className={`text-4xl transition-all duration-700 ${isPlaying || isBuffering ? 'text-accent-500 rotate-180' : 'text-white'}`}>
                 {isBuffering ? <i className="fas fa-circle-notch fa-spin"></i> : isPlaying ? <i className="fas fa-broadcast-tower"></i> : <i className="fas fa-play"></i>}
              </div>
            </button>

            <div className={`transition-all duration-700 px-6 transform ${(isPlaying || isBuffering) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
               <div className="bg-white/95 dark:bg-slate-800/90 backdrop-blur-xl border border-gray-100 dark:border-white/10 rounded-2xl p-5 shadow-2xl max-w-[240px] text-center relative">
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-accent-500 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                  <p className="text-[10px] text-gray-800 dark:text-gray-100 font-bold leading-relaxed italic">
                     {isBuffering && !isPlaying ? (
                       <span className="opacity-50 italic">Syncing Neural Pathway...</span>
                     ) : (
                       `"${isPlaying ? (mode === 'template' ? getScript() : generatedScript) : ''}"`
                     )}
                  </p>
               </div>
            </div>
          </div>
          
          <div className="absolute top-6 left-6 text-[7px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-l border-t border-gray-200 dark:border-slate-800 pt-1 pl-1">Input: {isPlaying ? 'Streaming' : 'Ready'}</div>
          <div className="absolute bottom-6 right-6 text-[7px] font-black text-gray-400 dark:text-slate-500 uppercase tracking-widest border-r border-b border-gray-200 dark:border-slate-800 pb-1 pr-1">Status: {isBuffering ? 'Busy' : 'Link OK'}</div>
        </div>
      </div>
    </div>
  );
};

export default VoiceStudio;