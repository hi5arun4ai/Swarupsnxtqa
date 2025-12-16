import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from "@google/genai";

const VoiceStudio: React.FC = () => {
  const [industry, setIndustry] = useState('Real Estate');
  const [language, setLanguage] = useState('Indian English');
  const [voiceVariant, setVoiceVariant] = useState('Female (Pro)');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  
  // Audio Refs for Real-Time Visualization & Playback
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const visualizerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const visualizerDataArrayRef = useRef<Uint8Array | null>(null);

  // Configuration Constants
  const INDUSTRIES = ['Real Estate', 'Healthcare', 'Banking', 'Finance', 'E-commerce', 'EdTech', 'Travel'];
  const LANGUAGES = ['Indian English', 'US English', 'Hindi', 'Tamil', 'Telugu'];
  const VOICES = ['Female (Pro)', 'Female (Calm)', 'Female (Enthusiastic)', 'Male (Assertive)', 'Male (Casual)', 'Male (Neutral)'];

  // Script Database
  const SCRIPTS: Record<string, Record<string, string>> = {
    'Real Estate': {
      'Indian English': "Hi there! I'm calling from Luxury Homes regarding your inquiry about the downtown penthouse. Is now a good time to discuss the amenities?",
      'US English': "Hello! This is an automated follow-up from Luxury Homes regarding your recent interest in our premium listings. Do you have a moment?",
      'Hindi': "नमस्ते! मैं लक्ज़री होम्स से बोल रही हूँ। आपने हमारे नए प्रोजेक्ट के बारे में पूछताछ की थी। क्या हम अभी सुविधाओं पर चर्चा कर सकते हैं?",
      'Tamil': "வணக்கம்! நான் லக்சுரி ஹோம்ஸிலிருந்து பேசுகிறேன். எங்கள் புதிய வீடுகள் பற்றி நீங்கள் விசாரித்தீர்கள். இப்போது பேசலாமா?",
      'Telugu': "నమస్కారం! నేను లగ్జరీ హోమ్స్ నుండి మాట్లాడుతున్నాను. మీరు డౌన్‌టౌన్ పెంట్‌హౌస్ గురించి ఆరా తీశారు. ఇప్పుడు సౌకర్యాల గురించి చర్చించవచ్చా?"
    },
    'Healthcare': {
      'Indian English': "Hello, this is Dr. Sharma's clinic. I'm calling to confirm your appointment for tomorrow at 10 AM. Would you like me to send the location?",
      'US English': "Hi, calling from City Health. Just a reminder for your check-up scheduled for tomorrow. Please press 1 to confirm.",
      'Hindi': "नमस्ते, यह डॉ. शर्मा का क्लिनिक है। मैं कल सुबह 10 बजे के लिए आपकी अपॉइंटमेंट कन्फर्म करने के लिए कॉल कर रही हूँ।",
      'Tamil': "வணக்கம், இது டாக்டர் ஷர்மாவின் கிளினிக். நாளை காலை 10 மணிக்கு உங்கள் அப்பாயிண்ட்மென்ட்டை உறுதிப்படுத்த அழைக்கிறேன்.",
      'Telugu': "నమస్కారం, ఇది డాక్టర్ శర్మ క్లినిక్. రేపు ఉదయం 10 గంటలకు మీ అపాయింట్‌మెంట్‌ని నిర్ధారించడానికి కాల్ చేస్తున్నాను."
    },
    'Banking': {
      'Indian English': "Greetings from Axis Bank. We noticed a transaction of 50,000 rupees on your card. Was this you? Say yes or no.",
      'US English': "Hello, this is a security alert from your bank. We detected unusual activity on your debit card. Please verify your identity.",
      'Hindi': "नमस्कार, मैं आपके बैंक से बोल रहा हूँ। आपके कार्ड पर एक बड़ा लेनदेन हुआ है। क्या यह आपने किया है?",
      'Tamil': "வணக்கம், உங்கள் வங்கிக் கணக்கில் ஒரு புதிய பரிவர்த்தனை நடந்துள்ளது. இது நீங்கள் செய்ததுதானா?",
      'Telugu': "యాక్సిస్ బ్యాంక్ నుండి శుభాకాంక్షలు. మీ కార్డ్‌లో 50,000 రూపాయల లావాదేవీని మేము గమనించాము. ఇది మీరేనా?"
    },
    'Finance': {
      'Indian English': "Good afternoon. Your mutual fund portfolio has grown by 12% this year. Would you like to review new investment options?",
      'US English': "Hello, this is your portfolio manager AI. The market is bullish today. Shall we look at some tech stocks?",
      'Hindi': "नमस्ते। आपके म्यूचुअल फंड पोर्टफोलियो में इस साल 12% की बढ़ोतरी हुई है। क्या आप निवेश के नए विकल्प देखना चाहेंगे?",
      'Tamil': "வணக்கம். இந்த ஆண்டு உங்கள் மியூச்சுவல் ஃபண்ட் போர்ட்ஃபோலியோ 12% வளர்ந்துள்ளது. புதிய முதலீட்டு விருப்பங்களை மதிப்பாய்வு செய்ய விரும்புகிறீர்களா?",
      'Telugu': "శుభ మధ్యాహ్నం. ఈ సంవత్సరం మీ మ్యూచువల్ ఫండ్ పోర్ట్‌ఫోలియో 12% పెరిగింది. మీరు కొత్త పెట్టుబడి ఎంపికలను సమీక్షించాలనుకుంటున్నారా?"
    },
    'E-commerce': {
      'Indian English': "Hi! Your order for the wireless headphones is out for delivery. Would you like to leave it at the security gate?",
      'US English': "Hey! Just updating you that your package is arriving by 2 PM. Reply STOP to unsubscribe.",
      'Hindi': "नमस्ते! आपके वायरलेस हेडफोन की डिलीवरी आज होने वाली है। क्या हम इसे सिक्योरिटी गेट पर छोड़ दें?",
      'Tamil': "வணக்கம்! உங்கள் வயர்லெஸ் ஹெட்ஃபோன்கள் டெலிவரிக்கு வந்துள்ளன. அதை செக்யூரிட்டி கேட்டில் கொடுக்கலாமா?",
      'Telugu': "హాయ్! వైర్‌లెస్ హెడ్‌ఫోన్‌ల కోసం మీ ఆర్డర్ డెలివరీ కోసం బయలుదేరింది. మేము దానిని సెక్యూరిటీ గేట్ వద్ద ఉంచాలనుకుంటున్నారా?"
    },
    'EdTech': {
      'Indian English': "Hi! We saw you started the Python course but didn't finish. We have a 20% discount if you restart today.",
      'US English': "Hey there! Noticed you paused your learning journey. Come back today and unlock a special scholarship.",
      'Hindi': "नमस्ते! हमने देखा कि आपने पायथन कोर्स शुरू किया था। अगर आप आज फिर से शुरू करते हैं तो विशेष छूट मिलेगी।",
      'Tamil': "வணக்கம்! நீங்கள் பைதான் படிப்பை பாதியில் நிறுத்திவிட்டீர்கள். இன்று மீண்டும் தொடங்கினால் சிறப்பு சலுகை உண்டு.",
      'Telugu': "హాయ్! మీరు పైథాన్ కోర్సును ప్రారంభించారు కానీ పూర్తి చేయలేదు. మీరు ఈరోజు పునఃప్రారంభించినట్లయితే మా వద్ద 20% తగ్గింపు ఉంది."
    },
    'Travel': {
      'Indian English': "Good morning! Your flight to Mumbai has been rescheduled to 4 PM. Would you like to confirm this new time?",
      'US English': "Hello traveler! Your booking confirmation is ready. Check your email for the itinerary details.",
      'Hindi': "सुप्रभात! आपकी मुंबई की उड़ान का समय बदलकर शाम 4 बजे कर दिया गया है। क्या आप इसे कन्फर्म करना चाहेंगे?",
      'Tamil': "காலை வணக்கம்! உங்கள் மும்பை விமானம் மாலை 4 மணிக்கு மாற்றப்பட்டுள்ளது. இதை உறுதிப்படுத்த விரும்புகிறீர்களா?",
      'Telugu': "శుభోదయం! ముంబైకి మీ విమానం సాయంత్రం 4 గంటలకు రీషెడ్యూల్ చేయబడింది. మీరు ఈ కొత్త సమయాన్ని నిర్ధారించాలనుకుంటున్నారా?"
    }
  };

  const getScript = () => {
    return SCRIPTS[industry]?.[language] || SCRIPTS['Real Estate']['Indian English'];
  };

  // --- AUDIO HELPER FUNCTIONS ---
  function decode(base64: string) {
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  async function decodeAudioData(
    data: Uint8Array,
    ctx: AudioContext,
    sampleRate: number = 24000,
    numChannels: number = 1
  ): Promise<AudioBuffer> {
    // IMPORTANT: clone the buffer because decodeAudioData detaches (empties) the ArrayBuffer it receives.
    // We need the original data if we fallback or logic changes.
    const bufferCopy = data.buffer.slice(0);

    try {
        // Try native browser decoding (works for MP3, WAV, etc.)
        return await ctx.decodeAudioData(bufferCopy);
    } catch (e) {
        // Fallback for Raw PCM data (Gemini native audio preview often sends raw PCM)
        // Note: Gemini 2.5 Flash TTS usually sends MP3-like headered audio, but this covers edge cases.
        // We use data.buffer (the original) here, assuming decodeAudioData failed on the copy.
        const dataInt16 = new Int16Array(data.buffer);
        const frameCount = dataInt16.length / numChannels;
        const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
        for (let channel = 0; channel < numChannels; channel++) {
          const channelData = buffer.getChannelData(channel);
          for (let i = 0; i < frameCount; i++) {
             // Convert Int16 to Float32 [-1.0, 1.0]
             channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
          }
        }
        return buffer;
    }
  }

  const stopAudio = () => {
    if (sourceRef.current) {
      try {
        sourceRef.current.stop();
      } catch (e) { /* ignore already stopped */ }
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsBuffering(false);
  };

  // --- VISUALIZER LOOP ---
  useEffect(() => {
    const animate = () => {
      if (visualizerRef.current) {
        const bars = Array.from(visualizerRef.current.children) as HTMLElement[];
        const isDark = document.documentElement.classList.contains('dark');
        
        // --- REAL-TIME DATA MODE ---
        if (isPlaying && analyserRef.current && visualizerDataArrayRef.current) {
           analyserRef.current.getByteFrequencyData(visualizerDataArrayRef.current);
           
           bars.forEach((bar, i) => {
             // Map 48 bars to frequency data
             const dataIndex = Math.floor(i * (visualizerDataArrayRef.current!.length / 80)); 
             const value = visualizerDataArrayRef.current![dataIndex];
             
             let height = (value / 255) * 100;
             height = Math.max(8, height); // Min height
             
             bar.style.height = `${height}%`;
             bar.style.opacity = `${0.6 + (height / 200)}`;
             
             if (isDark) {
                bar.style.backgroundColor = height > 60 ? '#67e8f9' : '#22d3ee';
                bar.style.boxShadow = `0 0 ${height/10}px ${height > 60 ? '#67e8f9' : '#22d3ee'}`;
             } else {
                bar.style.backgroundColor = height > 60 ? '#2E3A8C' : '#2BB6C6';
                bar.style.boxShadow = 'none';
             }
           });

        } 
        // --- IDLE / LOADING MODE ---
        else {
           const time = Date.now() / 800;
           bars.forEach((bar, i) => {
             const wave = Math.sin(time + i * 0.2);
             let height = 10 + (Math.abs(wave) * 15);
             if (isBuffering) height = 30 + Math.sin(Date.now() / 100 + i) * 20; 

             bar.style.height = `${height}%`;
             bar.style.opacity = isBuffering ? '0.8' : '0.3';
             
             if (isDark) {
                bar.style.backgroundColor = isBuffering ? '#fff' : '#475569';
                bar.style.boxShadow = isBuffering ? '0 0 5px white' : 'none';
             } else {
                bar.style.backgroundColor = isBuffering ? '#2E3A8C' : '#cbd5e1';
                bar.style.boxShadow = 'none';
             }
           });
        }
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isPlaying, isBuffering]);


  // --- GENAI TTS LOGIC ---
  const speakWithGenAI = async (text: string) => {
    // 1. Check API Key Existence to avoid console errors
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        speakWithFallback(text);
        return;
    }

    setIsBuffering(true);
    
    // Voice Mapping to Gemini 2.5 Voices
    let geminiVoiceName = 'Kore'; // Default Female
    if (voiceVariant.includes('Female (Calm)')) geminiVoiceName = 'Zephyr';
    if (voiceVariant.includes('Female (Enthusiastic)')) geminiVoiceName = 'Kore'; // Kore handles energy well
    if (voiceVariant.includes('Male (Assertive)')) geminiVoiceName = 'Fenrir';
    if (voiceVariant.includes('Male (Casual)')) geminiVoiceName = 'Puck';
    if (voiceVariant.includes('Male (Neutral)')) geminiVoiceName = 'Charon';

    // Advanced Prompt Engineering for Language & Tone
    let toneInstruction = "";
    const baseInstruction = "Speak with a highly natural, human-like quality, incorporating subtle breathing pauses and realistic prosody. Avoid robotic monotonicity.";
    
    if (voiceVariant.includes('Female (Pro)')) {
        toneInstruction = `${baseInstruction} Project a professional, polished, and articulate demeanor. Maintain a steady, confident pace suitable for a corporate environment.`;
    } else if (voiceVariant.includes('Female (Calm)')) {
        toneInstruction = `${baseInstruction} Adopt a soft, soothing, and relaxed tone. Speak with a gentle, unhurried cadence, conveying deep empathy and patience.`;
    } else if (voiceVariant.includes('Female (Enthusiastic)')) {
        toneInstruction = `${baseInstruction} Speak with high energy, warmth, and genuine excitement. Use dynamic intonation and an upbeat tempo, smiling while speaking.`;
    } else if (voiceVariant.includes('Male (Assertive)')) {
        toneInstruction = `${baseInstruction} Use a deep, confident, and authoritative tone. Be firm and decisive, yet polite, commanding respect and attention.`;
    } else if (voiceVariant.includes('Male (Casual)')) {
        toneInstruction = `${baseInstruction} Sound friendly, laid-back, and conversational. Use natural inflection as if speaking to a close friend.`;
    } else if (voiceVariant.includes('Male (Neutral)')) {
        toneInstruction = `${baseInstruction} Maintain a clear, balanced, and objective tone. Deliver the message with the neutrality and precision of a news anchor.`;
    }

    const contextPrompt = `
    Role: Professional Voice Actor
    Language Target: ${language}
    Voice Persona: ${voiceVariant}
    Style Instructions: ${toneInstruction}
    Task: Read the following text naturally, strictly adhering to the style instructions provided. Do not include any introductory text, just the speech.
    
    Text: "${text}"
    `;
    
    try {
      // 2. Initialize API
      const ai = new GoogleGenAI({ apiKey: apiKey });
      
      // 3. Call API
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: contextPrompt }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: geminiVoiceName },
            },
          },
        },
      });

      // 4. Extract Audio
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (!base64Audio) throw new Error("No audio data received");

      // 5. Decode & Prepare
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      
      // Resume context if suspended
      if (ctx.state === 'suspended') await ctx.resume();

      const audioBytes = decode(base64Audio);
      // Pass the Uint8Array to our safe decode function
      const audioBuffer = await decodeAudioData(audioBytes, ctx);

      // 6. Connect Real-Time Visualizer
      if (!analyserRef.current) {
        analyserRef.current = ctx.createAnalyser();
        analyserRef.current.fftSize = 128;
        visualizerDataArrayRef.current = new Uint8Array(analyserRef.current.frequencyBinCount);
      }
      
      const source = ctx.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(analyserRef.current);
      analyserRef.current.connect(ctx.destination);
      
      sourceRef.current = source;
      source.onended = () => {
         setIsPlaying(false);
         sourceRef.current = null;
      };

      // 7. Play
      setIsBuffering(false);
      setIsPlaying(true);
      source.start();

    } catch (error) {
      console.warn("GenAI TTS Failed, falling back to Web Speech API", error);
      speakWithFallback(text);
    }
  };

  // --- FALLBACK: WEB SPEECH API ---
  const speakWithFallback = (text: string) => {
    setIsBuffering(false);
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Select Voice Logic (Fallback)
    const voices = window.speechSynthesis.getVoices();
    
    // 1. Strict Language Filtering
    let langCode = 'en-US';
    if (language === 'Indian English') langCode = 'en-IN';
    else if (language === 'Hindi') langCode = 'hi';
    else if (language === 'Tamil') langCode = 'ta';
    else if (language === 'Telugu') langCode = 'te';

    let langMatches = voices.filter(v => v.lang.toLowerCase().includes(langCode.toLowerCase()));

    // Fallback for Indian English to generic English if specific accent missing
    if (langMatches.length === 0 && language.includes('English')) {
       langMatches = voices.filter(v => v.lang.startsWith('en'));
    }

    // 2. Strict Gender Filtering (Heuristic based on Name)
    const isFemaleTarget = voiceVariant.includes('Female');
    
    let selectedVoice = langMatches.find(v => {
       const n = v.name.toLowerCase();
       if (isFemaleTarget) {
         return n.includes('female') || n.includes('woman') || n.includes('samantha') || n.includes('zira') || n.includes('google');
       } else {
         return n.includes('male') || n.includes('man') || n.includes('david') || n.includes('daniel') || n.includes('rishi');
       }
    });

    // 3. Last Resort
    if (!selectedVoice && langMatches.length > 0) selectedVoice = langMatches[0];
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.warn(`No voice found for ${language} - ${isFemaleTarget ? 'Female' : 'Male'}`);
    }
    
    // Adjust Pitch/Rate for "Persona" - REFINED for Naturalness
    if (voiceVariant.includes('Female (Pro)')) { 
        utterance.rate = 1.0; 
        utterance.pitch = 1.0; 
    }
    else if (voiceVariant.includes('Female (Calm)')) { 
        utterance.rate = 0.9; 
        utterance.pitch = 0.95; 
    }
    else if (voiceVariant.includes('Female (Enthusiastic)')) { 
        utterance.rate = 1.1; 
        utterance.pitch = 1.05; 
    }
    else if (voiceVariant.includes('Male (Assertive)')) { 
        utterance.rate = 0.95; 
        utterance.pitch = 0.9; 
    }
    else if (voiceVariant.includes('Male (Casual)')) { 
        utterance.rate = 1.0; 
        utterance.pitch = 1.0; 
    }
    else if (voiceVariant.includes('Male (Neutral)')) { 
        utterance.rate = 1.0; 
        utterance.pitch = 1.0; 
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  const handlePlay = () => {
    if (isPlaying || isBuffering) {
      stopAudio();
      return;
    }
    const text = getScript();
    
    // Try High-Quality GenAI first
    speakWithGenAI(text);
  };

  // Initial Voice Load for Fallback
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length) setAvailableVoices(v);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => { stopAudio(); };
  }, []);

  return (
    <div className="container mx-auto px-6 text-center">
      <div className="mb-12">
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white mb-4">
          Audition Your <span className="text-accent-500">AI Employee</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
          Experience ultra-realistic neural voice agents. Select a persona and hear them speak instantly.
        </p>
      </div>

      <div className="max-w-5xl mx-auto glass-light dark:glass-dark rounded-[2.5rem] p-6 md:p-10 shadow-2xl border border-white/20 relative overflow-hidden group">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent-500/10 rounded-full blur-[100px] pointer-events-none transition-opacity duration-1000 group-hover:bg-accent-500/20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-900/10 dark:bg-brand-500/10 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-10">
          
          {/* Controls */}
          <div className="flex flex-col gap-8">
            
            {/* Industry Selection */}
            <div className="space-y-4 text-left">
              <label className="text-xs font-bold text-brand-900/60 dark:text-gray-400 uppercase tracking-widest pl-1">
                <i className="fas fa-building mr-2"></i>Select Industry
              </label>
              <div className="flex flex-wrap gap-3">
                {INDUSTRIES.map(ind => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border flex items-center gap-2
                    ${industry === ind 
                      ? 'bg-brand-900 dark:bg-accent-500 text-white dark:text-brand-950 border-transparent shadow-lg shadow-brand-900/20 dark:shadow-accent-500/30 scale-105 z-10 ring-2 ring-offset-2 ring-transparent dark:ring-offset-slate-900' 
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-accent-400 dark:hover:border-accent-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-md hover:-translate-y-0.5'}`}
                  >
                    {ind}
                    {industry === ind && <i className="fas fa-check-circle text-xs ml-1 opacity-80"></i>}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Selection */}
            <div className="space-y-4 text-left">
              <label className="text-xs font-bold text-brand-900/60 dark:text-gray-400 uppercase tracking-widest pl-1">
                <i className="fas fa-globe mr-2"></i>Language & Accent
              </label>
              <div className="flex flex-wrap gap-3">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border flex items-center gap-2
                    ${language === lang 
                      ? 'bg-accent-500 text-white dark:text-brand-950 border-transparent shadow-lg shadow-accent-500/30 scale-105 z-10 ring-2 ring-offset-2 ring-transparent dark:ring-offset-slate-900' 
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-accent-400 dark:hover:border-accent-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-md hover:-translate-y-0.5'}`}
                  >
                    {lang}
                    {language === lang && <i className="fas fa-check-circle text-xs ml-1 opacity-80"></i>}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Variant Selection - Search Removed */}
            <div className="space-y-4 text-left">
              <label className="text-xs font-bold text-brand-900/60 dark:text-gray-400 uppercase tracking-widest pl-1">
                <i className="fas fa-microphone-alt mr-2"></i>Voice Persona
              </label>

              <div className="flex flex-wrap gap-3">
                {VOICES.map(voice => (
                  <button
                    key={voice}
                    onClick={() => setVoiceVariant(voice)}
                    className={`px-6 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 border flex items-center gap-2
                    ${voiceVariant === voice 
                      ? 'bg-brand-800 dark:bg-white text-white dark:text-brand-900 border-transparent shadow-lg scale-105 z-10 ring-2 ring-offset-2 ring-transparent dark:ring-offset-slate-900' 
                      : 'bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 border-gray-200 dark:border-slate-600 hover:border-accent-400 dark:hover:border-accent-400 hover:bg-gray-50 dark:hover:bg-slate-700 hover:shadow-md hover:-translate-y-0.5'}`}
                  >
                    <i className={`fas ${voice.includes('Female') ? 'fa-venus' : 'fa-mars'} opacity-70`}></i>
                    {voice}
                    {voiceVariant === voice && <i className="fas fa-check-circle text-xs ml-1 opacity-80"></i>}
                  </button>
                ))}
              </div>
            </div>

          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-600 to-transparent"></div>

          {/* Visualizer & Play Action */}
          <div className="flex flex-col items-center justify-center space-y-8 min-h-[160px]">
            
            {/* Real-Time Frequency Visualizer */}
            <div 
              ref={visualizerRef}
              className="h-32 flex items-center justify-center gap-1.5 w-full max-w-2xl px-4"
            >
              {[...Array(48)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1.5 rounded-full transition-all duration-75"
                  style={{ height: '6px', opacity: 0.4 }}
                ></div>
              ))}
            </div>

            <div className="relative group/play">
               {/* Pulse Ring */}
               {(isPlaying || isBuffering) && (
                  <div className="absolute inset-0 rounded-full bg-accent-500 animate-ping opacity-20"></div>
               )}
               
               <button 
                onClick={handlePlay}
                disabled={isBuffering}
                className={`
                  relative z-10 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center text-3xl transition-all duration-300 transform hover:scale-105 shadow-2xl border-4
                  ${isPlaying || isBuffering
                    ? 'bg-white dark:bg-slate-900 border-red-500 text-red-500 shadow-red-500/20' 
                    : 'bg-gradient-to-br from-brand-900 to-brand-800 dark:from-white dark:to-gray-200 border-transparent text-white dark:text-brand-900 shadow-brand-900/30'}
                `}
              >
                {isBuffering ? (
                   <i className="fas fa-circle-notch fa-spin"></i>
                ) : (
                   <i className={`fas ${isPlaying ? 'fa-stop' : 'fa-play pl-1.5'}`}></i>
                )}
              </button>
            </div>
            
            <div className="space-y-2">
               <p className={`text-lg font-bold transition-colors ${isPlaying ? 'text-accent-500' : 'text-gray-800 dark:text-white'}`}>
                  {isBuffering ? 'Generating Audio...' : isPlaying ? 'Speaking...' : 'Click to Audit'}
               </p>
               <div className="text-xs text-gray-500 dark:text-gray-300 font-medium tracking-wide flex items-center justify-center gap-2">
                  <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-gray-200 dark:border-slate-700">{industry}</span>
                  <span>•</span>
                  <span className="bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-gray-200 dark:border-slate-700">{language}</span>
                  <span className="hidden md:inline">•</span>
                  <span className="hidden md:inline text-accent-500 text-[10px] uppercase border border-accent-500/30 px-1.5 py-0.5 rounded">Powered by Gemini 2.5</span>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceStudio;