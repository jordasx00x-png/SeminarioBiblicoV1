import { useState } from 'react';
import { ExamQuestion } from '../types';
import { CheckCircle2, XCircle, ScrollText, Award } from 'lucide-react';

interface FinalExamProps {
  questions: ExamQuestion[];
  isPreviouslyCompleted: boolean;
  previousScore?: number;
  onComplete: (score: number) => void;
  onCancel?: () => void;
}

export function FinalExam({ questions, isPreviouslyCompleted, previousScore, onComplete, onCancel }: FinalExamProps) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const isAllAnswered = questions.every(q => answers[q.id] !== undefined);

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) correctCount++;
    });
    
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
    onComplete(finalScore);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden font-sans border border-[#E0D7C6]">
      <div className="bg-[#1A2533] border-b border-[#2C3E50] p-8 text-center relative overflow-hidden text-white">
        <ScrollText className="mx-auto text-[#E0D7C6] mb-4" size={40} strokeWidth={1.5} />
        <h2 className="text-2xl font-bold mb-3 text-white tracking-tight font-serif">Evaluación Comprensiva</h2>
        <p className="text-gray-400 font-medium text-sm">Integre los conocimientos obtenidos respondiendo al escrutinio final.</p>
        
        {isPreviouslyCompleted && !submitted && (
           <div className="mt-6 inline-block bg-[#7F1D1D]/20 text-[#FDE68A] px-5 py-2 rounded font-bold text-xs uppercase tracking-widest border border-[#7F1D1D]/50">
             Acreditada previamente: {previousScore}%
           </div>
        )}
      </div>

      <div className="p-8 space-y-10">
        {questions.map((q, index) => {
          const selectedIdx = answers[q.id];
          const isCorrect = selectedIdx === q.correctAnswerIndex;

          return (
             <div key={q.id} className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-bold text-[#1A2533] text-lg flex gap-4 leading-relaxed font-serif">
                  <span className="text-[#7F1D1D] shrink-0 mt-0.5">{index + 1}.</span> 
                  {q.question}
                </h3>
                
                <div className="space-y-2 pl-0 md:pl-8">
                  {q.options.map((opt, i) => {
                     let btnClass = "w-full text-left flex items-center gap-3 p-3 border rounded bg-white transition-all text-sm";
                     
                     if (!submitted) {
                       if (selectedIdx === i) {
                          btnClass += " border-[#7F1D1D] bg-red-50 text-red-900 shadow-sm ring-1 ring-[#7F1D1D]/50";
                       } else {
                          btnClass += " border-[#E0D7C6] text-gray-700 hover:border-[#7F1D1D] cursor-pointer hover:shadow-sm";
                       }
                     } else {
                        if (i === q.correctAnswerIndex) {
                           btnClass += " border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm";
                        } else if (i === selectedIdx) {
                           btnClass += " border-red-300 bg-red-50 text-red-900 opacity-80 cursor-not-allowed";
                        } else {
                           btnClass += " border-[#E0D7C6] text-gray-400 cursor-not-allowed opacity-50";
                        }
                     }

                     return (
                        <button
                          key={i}
                          disabled={submitted}
                          onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                          className={btnClass}
                        >
                          <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center ${
                            submitted && i === q.correctAnswerIndex ? 'border-emerald-500 bg-emerald-500' :
                            selectedIdx === i ? 'border-[#7F1D1D] bg-[#7F1D1D]' : 'border-gray-300'
                          }`}>
                            {(selectedIdx === i || (submitted && i === q.correctAnswerIndex)) && (
                              <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            )}
                          </div>
                          <span className="leading-snug flex-1">{opt}</span>
                          {submitted && i === q.correctAnswerIndex && <CheckCircle2 size={18} className="text-emerald-500 shrink-0 ml-2" />}
                          {submitted && i === selectedIdx && i !== q.correctAnswerIndex && <XCircle size={18} className="text-red-500 shrink-0 ml-2" />}
                        </button>
                     );
                  })}
                </div>

                {submitted && (
                   <div className={`mt-5 md:ml-8 p-4 rounded text-sm flex flex-col gap-1.5 border ${isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'}`}>
                      <div className="font-bold uppercase tracking-wider text-[10px] opacity-70">Exégesis de Respuesta:</div>
                      <div className="font-medium">{q.explanation}</div>
                   </div>
                )}
             </div>
          );
        })}
      </div>

      {!submitted && (
        <div className="p-8 bg-gray-50 border-t border-[#E0D7C6] flex justify-between">
           {onCancel ? (
             <button 
               onClick={onCancel}
               className="bg-white border border-[#E0D7C6] hover:bg-gray-50 text-[#1A2533] px-6 py-3 rounded text-sm font-bold tracking-widest uppercase transition-all duration-200 shadow-sm"
             >
               Repasar Lección
             </button>
           ) : <div />}
           <button 
             onClick={handleSubmit}
             disabled={!isAllAnswered}
             className="bg-[#1A2533] hover:bg-black text-white px-8 py-3 rounded text-sm font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow"
           >
             Acreditar Módulo
           </button>
        </div>
      )}

      {submitted && (
        <div className="p-10 bg-[#1A2533] text-center border-t border-[#2C3E50] animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="text-[#8E9EAD] uppercase tracking-widest font-bold text-[10px] mb-4 flex items-center justify-center gap-2">
             <Award size={14} /> Certificación Final
           </div>
           <div className={`text-5xl font-bold mb-4 font-serif tracking-tighter ${score >= 80 ? 'text-emerald-400' : score >= 60 ? 'text-[#FDE68A]' : 'text-red-400'}`}>
             {score}%
           </div>
           <p className="text-gray-300 font-medium mb-8 text-sm max-w-lg mx-auto leading-relaxed">
             {score === 100 ? 'El nivel de aprehensión doctrinal es excepcional. Ha asimilado los principios con rectitud y rigor metodológico.' :
              score >= 80 ? 'Posee una sólida base exegética. Mantiene una apreciación madura de los argumentos discutidos.' :
              score >= 60 ? 'Certificación limítrofe. Sugerimos un repaso activo de la bibliografía de la sesión.' :
              'La aprehensión del material no ha sido óptima para el estándar del seminario. El módulo permanecerá disponible para su reconsideración.'}
           </p>
           <button 
             onClick={() => {
                setSubmitted(false);
                setAnswers({});
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
             }}
             className="text-gray-400 hover:text-white font-bold transition-colors hover:underline text-[10px] uppercase tracking-widest"
           >
             Reevaluar módulo
           </button>
        </div>
      )}
    </div>
  );
}
