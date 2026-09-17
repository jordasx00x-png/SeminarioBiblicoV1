import React, { useState } from 'react';
import { ControlQuestion } from '../types';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Sparkles } from 'lucide-react';

interface InteractiveCheckpointProps {
  question: ControlQuestion;
}

export function InteractiveCheckpoint({ question }: InteractiveCheckpointProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const isCorrect = selectedOption === question.correctAnswerIndex;

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);
  };

  const handleReset = () => {
    setSelectedOption(null);
    setHasAnswered(false);
  };

  return (
    <div className="my-8 rounded-xl border-2 border-[#E0D7C6] dark:border-slate-800 bg-[#FDFCFB] dark:bg-slate-900 shadow-sm overflow-hidden font-sans transition-all">
      {/* Header bar */}
      <div className="bg-[#1A2533] px-5 py-3.5 flex items-center justify-between text-white border-b border-[#2C3E50]">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-[#7F1D1D] flex items-center justify-center text-xs font-bold text-white">
            <HelpCircle size={14} />
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest font-bold text-[#E0D7C6] block">
              Punto de Control Interactivo
            </span>
            <span className="text-[10px] text-gray-400 block -mt-0.5">
              Comprobación Exegética en Tiempo Real
            </span>
          </div>
        </div>
        {hasAnswered && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 transition-all cursor-pointer font-medium"
          >
            <RotateCcw size={12} />
            <span>Reintentar</span>
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-5">
        <h4 className="text-base md:text-lg font-bold text-[#1A2533] dark:text-slate-100 font-serif leading-snug">
          {question.question}
        </h4>

        {/* Options */}
        <div className="space-y-2.5">
          {question.options.map((option, idx) => {
            const isThisOptionSelected = selectedOption === idx;
            const isThisOptionCorrect = idx === question.correctAnswerIndex;

            let optionStyle = "border-gray-200 dark:border-slate-800 hover:border-[#1A2533] dark:hover:border-slate-600 hover:bg-stone-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 bg-white dark:bg-slate-900";
            let badgeStyle = "bg-stone-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300 border-gray-200 dark:border-slate-700";

            if (hasAnswered) {
              if (isThisOptionCorrect) {
                optionStyle = "border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-1 ring-emerald-500 font-medium";
                badgeStyle = "bg-emerald-600 text-white border-emerald-600";
              } else if (isThisOptionSelected && !isThisOptionCorrect) {
                optionStyle = "border-red-400 bg-red-50/80 text-red-950 font-medium";
                badgeStyle = "bg-red-600 text-white border-red-600";
              } else {
                optionStyle = "border-gray-100 opacity-50 bg-white text-gray-400";
                badgeStyle = "bg-gray-100 text-gray-400 border-gray-200";
              }
            }

            return (
              <button
                key={idx}
                disabled={hasAnswered}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left p-3.5 md:p-4 rounded-lg border transition-all flex items-start gap-3.5 cursor-pointer disabled:cursor-default ${optionStyle}`}
              >
                <div className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold transition-colors ${badgeStyle}`}>
                  {String.fromCharCode(65 + idx)}
                </div>
                <span className="flex-1 text-sm md:text-[15px] leading-relaxed">
                  {option}
                </span>
                {hasAnswered && isThisOptionCorrect && (
                  <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5 animate-in zoom-in" />
                )}
                {hasAnswered && isThisOptionSelected && !isThisOptionCorrect && (
                  <XCircle size={18} className="text-red-600 shrink-0 mt-0.5 animate-in zoom-in" />
                )}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation */}
        {hasAnswered && (
          <div
            className={`p-4 md:p-5 rounded-lg border text-sm leading-relaxed animate-in fade-in slide-in-from-top-2 duration-300 ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold mb-1.5">
              {isCorrect ? (
                <>
                  <Sparkles size={16} className="text-emerald-700" />
                  <span className="text-emerald-800 uppercase tracking-wider text-xs">
                    ¡Excelente discernimiento exegético!
                  </span>
                </>
              ) : (
                <>
                  <HelpCircle size={16} className="text-amber-700" />
                  <span className="text-amber-800 uppercase tracking-wider text-xs">
                    Revisión Teológica Recomendada
                  </span>
                </>
              )}
            </div>
            <p className="font-serif">
              {question.explanation || (isCorrect 
                ? 'Ha identificado con precisión el principio fundamental según el análisis gramatical e histórico del pasaje.'
                : 'La opción seleccionada pasa por alto los conectores lógicos del texto original. Revise la opción resaltada en verde.')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
