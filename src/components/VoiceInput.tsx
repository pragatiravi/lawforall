import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Mic, MicOff, AlertCircle } from 'lucide-react';

interface VoiceInputProps {
  onTranscript: (text: string) => void;
  language: string;
  theme: 'light' | 'dark';
  onListeningChange?: (listening: boolean) => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Single source of truth for STT language mapping
const speechLangMap: { [key: string]: string } = {
  en: 'en-IN',
  hi: 'hi-IN',
  kn: 'kn-IN',
  mr: 'mr-IN',
};

export default function VoiceInput({ onTranscript, language, theme, onListeningChange }: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const recognitionRef = useRef<any>(null);
  const onTranscriptRef = useRef(onTranscript);
  const onListeningChangeRef = useRef(onListeningChange);

  // Keep refs up to date without recreating recognition
  useEffect(() => {
    onTranscriptRef.current = onTranscript;
  }, [onTranscript]);

  useEffect(() => {
    onListeningChangeRef.current = onListeningChange;
  }, [onListeningChange]);

  // Initialize recognition ONCE
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError('not-supported');
      return;
    }

    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
      setError(null);
      onListeningChangeRef.current?.(true);
    };

    rec.onend = () => {
      setIsListening(false);
      onListeningChangeRef.current?.(false);
    };

    rec.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript;
      if (transcript) {
        setRetryCount(0); // Reset retry on success
        onTranscriptRef.current(transcript);
      }
    };

    rec.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
      onListeningChangeRef.current?.(false);

      if (event.error === 'no-speech') {
        setError('no-speech');
      } else if (event.error === 'not-allowed') {
        setError('not-allowed');
      } else if (event.error === 'network') {
        setError('network');
      } else if (event.error !== 'aborted') {
        setError(event.error);
      }
    };

    recognitionRef.current = rec;

    return () => {
      try { rec.abort(); } catch (_) {}
    };
  }, []); // Only once

  const toggleListening = useCallback(() => {
    const rec = recognitionRef.current;
    if (!rec) return;

    if (isListening) {
      rec.stop();
      return;
    }

    // Apply the CORRECT language for this session
    const targetLang = speechLangMap[language] || 'en-IN';
    rec.lang = targetLang;

    setError(null);

    try {
      rec.start();
    } catch (e: any) {
      // If already started, stop and restart
      if (e.message?.includes('already started')) {
        rec.stop();
        setTimeout(() => {
          try { rec.start(); } catch (_) {}
        }, 200);
      } else {
        console.error('Failed to start recognition:', e);
        setError('start-failed');

        // AUTO-RETRY once for Kannada/Marathi
        if ((language === 'kn' || language === 'mr') && retryCount < 1) {
          setRetryCount(prev => prev + 1);
          setTimeout(() => {
            try { rec.start(); } catch (_) {}
          }, 500);
        }
      }
    }
  }, [isListening, language, retryCount]);

  if (error === 'not-supported') {
    return null;
  }

  const showFallbackHint = error && error !== 'not-supported' && error !== 'aborted' && (language === 'kn' || language === 'mr');
  const showGenericError = error && error !== 'not-supported' && error !== 'aborted' && error !== 'no-speech';

  return (
    <div className="relative">
      <button
        onClick={toggleListening}
        type="button"
        className={`p-2.5 rounded-full transition-all duration-300 ${
          isListening
            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse shadow-lg shadow-red-500/30'
            : theme === 'dark'
              ? 'bg-white/10 hover:bg-white/20 text-indigo-200'
              : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
        }`}
        title={isListening ? 'Stop Listening' : `Speak (${speechLangMap[language] || 'en-IN'})`}
      >
        {isListening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>

      {/* Error / Fallback hints */}
      {(showGenericError || showFallbackHint) && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-red-500/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg flex flex-col items-center gap-1.5 shadow-lg w-max max-w-[220px] text-center z-50">
          <div className="flex items-center gap-1">
            <AlertCircle size={12} />
            {error === 'not-allowed' ? 'Microphone access denied' : error === 'network' ? 'Network error' : 'Recognition failed'}
          </div>
          {showFallbackHint && (
            <span className="text-[10px] opacity-90 leading-tight">
              👉 Voice recognition for {language === 'kn' ? 'Kannada' : 'Marathi'} may be limited on this device. Try typing your query instead.
            </span>
          )}
        </div>
      )}
    </div>
  );
}
