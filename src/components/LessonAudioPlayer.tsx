import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square, Volume2, VolumeX, FastForward, Sparkles } from 'lucide-react';

interface LessonAudioPlayerProps {
  title: string;
  textToRead: string;
}

export function LessonAudioPlayer({ title, textToRead }: LessonAudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isSupported, setIsSupported] = useState(true);
  const [progress, setProgress] = useState(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }

    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanText = (raw: string) => {
    return raw
      .replace(/[*#_`]/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/\n+/g, '. ')
      .trim();
  };

  const handlePlay = () => {
    if (!isSupported) return;

    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPlaying(true);
      setIsPaused(false);
      return;
    }

    window.speechSynthesis.cancel();

    const text = cleanText(textToRead);
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Set Spanish voice if available
    const voices = window.speechSynthesis.getVoices();
    const esVoice = voices.find(v => v.lang.startsWith('es') || v.lang.includes('Spanish'));
    if (esVoice) {
      utterance.voice = esVoice;
    }
    utterance.lang = 'es-ES';
    utterance.rate = playbackRate;

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setProgress(5);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      setTimeout(() => setProgress(0), 1000);
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis error', e);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utterance.onboundary = (event) => {
      if (event.charIndex && text.length > 0) {
        const percent = Math.min(100, Math.round((event.charIndex / text.length) * 100));
        setProgress(percent);
      }
    };

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    if (!isSupported) return;
    window.speechSynthesis.pause();
    setIsPlaying(false);
    setIsPaused(true);
  };

  const handleStop = () => {
    if (!isSupported) return;
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  const toggleRate = () => {
    const rates = [1, 1.25, 1.5];
    const nextRate = rates[(rates.indexOf(playbackRate) + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (isPlaying && utteranceRef.current) {
      // Restart with new rate
      handleStop();
      setTimeout(handlePlay, 100);
    }
  };

  if (!isSupported) {
    return null;
  }

  return (
    <div className="bg-[#1A2533] text-white rounded-xl p-4 md:p-5 shadow-sm border border-[#2C3E50] font-sans my-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
            isPlaying ? 'bg-[#7F1D1D] text-white animate-pulse' : 'bg-white/10 text-[#E0D7C6]'
          }`}>
            <Volume2 size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#E0D7C6] uppercase tracking-widest">
                Narrador Académico en Audio
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] bg-white/10 px-2 py-0.5 rounded text-gray-300 font-medium">
                <Sparkles size={10} className="text-amber-400" />
                Voz IA
              </span>
            </div>
            <p className="text-xs text-gray-300 font-serif line-clamp-1">
              {title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={toggleRate}
            title="Cambiar velocidad"
            className="px-2.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-xs font-bold font-mono tracking-wider transition-all cursor-pointer text-gray-200"
          >
            {playbackRate}x
          </button>

          {!isPlaying ? (
            <button
              onClick={handlePlay}
              className="flex items-center gap-2 bg-[#7F1D1D] hover:bg-red-800 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer active:scale-95"
            >
              <Play size={14} fill="currentColor" />
              <span>{isPaused ? 'Reanudar' : 'Escuchar Lección'}</span>
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow cursor-pointer active:scale-95"
            >
              <Pause size={14} fill="currentColor" />
              <span>Pausar</span>
            </button>
          )}

          {(isPlaying || isPaused) && (
            <button
              onClick={handleStop}
              title="Detener audio"
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <Square size={14} fill="currentColor" />
            </button>
          )}
        </div>
      </div>

      {/* Progress bar */}
      {(isPlaying || progress > 0) && (
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-[#E0D7C6] h-full rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-[10px] text-gray-400 mt-1 font-mono">
            <span>En reproducción: modo inmersivo</span>
            <span>{progress}% completado</span>
          </div>
        </div>
      )}
    </div>
  );
}
