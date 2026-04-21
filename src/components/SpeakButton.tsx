import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface SpeakButtonProps {
  text: string;
  language: string;
  theme: 'light' | 'dark';
}

// Single source of truth for TTS language mapping
const ttsLangMap: { [key: string]: string } = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  mr: 'mr-IN',
};

// Fallback voice chain: try exact → region → language prefix → any Indian voice
function findBestVoice(voices: SpeechSynthesisVoice[], langCode: string): SpeechSynthesisVoice | null {
  const targetLang = ttsLangMap[langCode] || 'en-IN';
  const prefix = langCode.substring(0, 2);

  // 1. Exact match (e.g., "kn-IN")
  let voice = voices.find(v => v.lang === targetLang);
  if (voice) return voice;

  // 2. Partial match (e.g., lang starts with "kn")
  voice = voices.find(v => v.lang.startsWith(prefix));
  if (voice) return voice;

  // 3. Any Indian voice as fallback (not English)
  if (langCode !== 'en') {
    voice = voices.find(v => v.lang.endsWith('-IN') && !v.lang.startsWith('en'));
    if (voice) return voice;
  }

  // 4. Indian English as last resort
  voice = voices.find(v => v.lang === 'en-IN');
  if (voice) return voice;

  // 5. Any English
  voice = voices.find(v => v.lang.startsWith('en'));
  return voice || null;
}

export default function SpeakButton({ text, language, theme }: SpeakButtonProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voicesReady, setVoicesReady] = useState(false);

  // Ensure voices are loaded
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoicesReady(true);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(() => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    // Clean markdown
    const cleanText = text.replace(/\*\*/g, '').replace(/\*/g, '').replace(/#/g, '').replace(/- /g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    const targetLang = ttsLangMap[language] || 'en-IN';
    utterance.lang = targetLang;

    // Find the best matching voice
    const voices = window.speechSynthesis.getVoices();
    const bestVoice = findBestVoice(voices, language);
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech Synthesis Error:', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }, [text, language, isSpeaking]);

  return (
    <button
      onClick={speak}
      type="button"
      className={`p-1.5 rounded-full transition-all duration-200 mt-1 self-end scale-90 hover:scale-100 ${
        isSpeaking
          ? 'bg-indigo-500/20 text-indigo-300 animate-pulse'
          : theme === 'dark'
            ? 'hover:bg-white/10 text-indigo-300'
            : 'hover:bg-slate-200 text-slate-500'
      }`}
      title={isSpeaking ? 'Stop Speaking' : `Read Response (${ttsLangMap[language] || 'en-IN'})`}
    >
      {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
