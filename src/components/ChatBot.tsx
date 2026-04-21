import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { GoogleGenAI } from "@google/genai";
import { Send, Bot, User, Loader2, ShieldAlert, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import VoiceInput from './VoiceInput';
import SpeakButton from './SpeakButton';

interface Message {
  role: 'user' | 'model';
  text: string;
}

// Single source of truth for TTS language mapping
const ttsLangMap: { [key: string]: string } = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  mr: 'mr-IN',
};

// Language display names for UI feedback
const langDisplayName: { [key: string]: string } = {
  en: 'English',
  hi: 'हिंदी',
  kn: 'ಕನ್ನಡ',
  mr: 'मराठी',
};

// Fallback voice finder — same logic as SpeakButton for consistency
function findBestVoice(voices: SpeechSynthesisVoice[], langCode: string): SpeechSynthesisVoice | null {
  const targetLang = ttsLangMap[langCode] || 'en-IN';
  const prefix = langCode.substring(0, 2);

  let voice = voices.find(v => v.lang === targetLang);
  if (voice) return voice;

  voice = voices.find(v => v.lang.startsWith(prefix));
  if (voice) return voice;

  if (langCode !== 'en') {
    voice = voices.find(v => v.lang.endsWith('-IN') && !v.lang.startsWith('en'));
    if (voice) return voice;
  }

  voice = voices.find(v => v.lang === 'en-IN');
  if (voice) return voice;

  voice = voices.find(v => v.lang.startsWith('en'));
  return voice || null;
}

export default function ChatBot({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const voicesLoadedRef = useRef(false);

  // Pre-load voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis?.getVoices();
      if (voices && voices.length > 0) {
        voicesLoadedRef.current = true;
      }
    };
    loadVoices();
    if (window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // CORE TTS: Speaks the response in the current app language
  const speakResponse = (text: string, lang: string) => {
    if (!window.speechSynthesis || isMuted) return;

    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').replace(/- /g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetLang = ttsLangMap[lang] || 'en-IN';
    utterance.lang = targetLang;

    // Find best voice with fallback chain
    const voices = window.speechSynthesis.getVoices();
    const bestVoice = findBestVoice(voices, lang);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  // Build the STRICT system prompt enforcing language consistency
  const buildSystemPrompt = (lang: string): string => {
    const langName = langDisplayName[lang] || 'English';
    return `You are a civic education assistant explaining Indian laws in simple, neutral language.
You do not provide legal advice, legal strategy, or guarantee outcomes.
You explain only for general understanding.

STRICT LANGUAGE RULE: You MUST respond ONLY in ${langName}. 
The user's selected language is '${lang}' (${langName}).
Do NOT translate, switch, or mix languages under any condition.
Even if the user writes in a different language, you MUST respond in ${langName} only.
Every single word of your response must be in ${langName}.

Always end your response with: ${t('ai_disclaimer')}`;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    // Capture the current language at send time — this is the single source of truth
    const currentLanguage = i18n.language;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: buildSystemPrompt(currentLanguage),
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'model', text: aiText }]);

      // Auto-speak in the SAME language as the request
      setTimeout(() => speakResponse(aiText, currentLanguage), 150);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Error connecting to AI. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-[500px] md:h-[600px] backdrop-blur-xl rounded-3xl border shadow-2xl overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-white/10 border-white/20' : 'bg-white border-slate-200'
    }`}>
      {/* Header */}
      <div className={`p-4 sm:p-6 border-b flex items-center justify-between gap-3 ${
        theme === 'dark' ? 'border-white/10 bg-indigo-600/20' : 'border-slate-100 bg-indigo-50'
      }`}>
        <div className="flex items-center gap-3">
          <Bot className={theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'} />
          <div>
            <h2 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{t('ai_assistant')}</h2>
            <p className={`text-xs flex items-center gap-1 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-600'}`}>
              <ShieldAlert size={12} /> {t('disclaimer_title')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Language indicator */}
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-full ${
            theme === 'dark' ? 'bg-white/10 text-indigo-300' : 'bg-slate-200 text-slate-600'
          }`}>
            {langDisplayName[i18n.language] || i18n.language}
          </span>

          {/* Mute toggle */}
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              if (!isMuted) {
                window.speechSynthesis.cancel();
                setIsSpeaking(false);
              }
            }}
            className={`p-2 rounded-full transition-colors ${
              theme === 'dark' ? 'hover:bg-white/10 text-indigo-300' : 'hover:bg-slate-200 text-indigo-600'
            }`}
            title={isMuted ? 'Unmute Auto-Speak' : 'Mute Auto-Speak'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide">
        {messages.length === 0 && (
          <div className={`text-center py-10 italic ${theme === 'dark' ? 'text-indigo-200/50' : 'text-slate-400'}`}>
            {t('chat_placeholder')}
          </div>
        )}
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] p-4 rounded-2xl flex gap-3 ${
                m.role === 'user'
                  ? 'bg-indigo-600 text-white rounded-tr-none'
                  : theme === 'dark'
                    ? 'bg-white/5 text-indigo-50 border border-white/10 rounded-tl-none'
                    : 'bg-slate-100 text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                {m.role === 'model' && <Bot size={18} className={`shrink-0 mt-1 ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} />}
                <div className="flex flex-col gap-1 w-full">
                  <div className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</div>
                  {m.role === 'model' && (
                    <div className="flex justify-end">
                      <SpeakButton text={m.text} language={i18n.language} theme={theme} />
                    </div>
                  )}
                </div>
                {m.role === 'user' && <User size={18} className="shrink-0 mt-1" />}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex justify-start">
            <div className={`p-4 rounded-2xl rounded-tl-none border ${
              theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
            }`}>
              <Loader2 className={`animate-spin ${theme === 'dark' ? 'text-indigo-400' : 'text-indigo-600'}`} size={20} />
            </div>
          </div>
        )}
      </div>

      {/* Status indicators */}
      {(isListening || isSpeaking) && (
        <div className={`px-6 py-1.5 text-xs flex items-center gap-1.5 border-t ${
          isListening
            ? theme === 'dark' ? 'bg-red-500/5 text-red-400 border-white/10' : 'bg-red-50 text-red-600 border-slate-100'
            : theme === 'dark' ? 'bg-indigo-500/5 text-indigo-400 border-white/10' : 'bg-indigo-50 text-indigo-600 border-slate-100'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isListening ? 'bg-red-500' : 'bg-indigo-500'}`} />
          {isListening
            ? `🎙 ${t('listening') || 'Listening'}... (${langDisplayName[i18n.language] || i18n.language})`
            : `🔊 Speaking... (${langDisplayName[i18n.language] || i18n.language})`
          }
        </div>
      )}

      {/* Input bar */}
      <div className={`p-4 border-t ${theme === 'dark' ? 'bg-black/20 border-white/10' : 'bg-slate-50 border-slate-100'}`}>
        <div className="flex items-center gap-2">
          <VoiceInput
            onTranscript={(text) => setInput(prev => prev ? `${prev} ${text}` : text)}
            language={i18n.language}
            theme={theme}
            onListeningChange={setIsListening}
          />
          <div className="relative flex-1 flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={t('chat_placeholder')}
              className={`w-full border rounded-full py-3 px-6 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all ${
                theme === 'dark'
                  ? 'bg-white/5 border-white/20 text-white placeholder-indigo-300/50'
                  : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
            <button
              onClick={handleSend}
              disabled={loading}
              className="absolute right-2 p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
