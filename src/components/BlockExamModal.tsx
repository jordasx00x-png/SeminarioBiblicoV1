import { useState, useEffect } from 'react';
import { ExamQuestion, Lesson } from '../types';
import { Award, AlertTriangle, CheckCircle2, XCircle, ScrollText, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

interface BlockExamModalProps {
  milestone: number;
  courseTitle: string;
  firstLessonTitle: string;
  lessonsInBlock: Lesson[];
  onPass: (score: number) => void;
  onFail: (score: number) => void;
}

export function BlockExamModal({ milestone, courseTitle, firstLessonTitle, lessonsInBlock, onPass, onFail }: BlockExamModalProps) {
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  // Generate questions from the actual lessons in this block
  useEffect(() => {
    let combinedQuestions: ExamQuestion[] = [];
    lessonsInBlock.forEach(lesson => {
      if (lesson.finalExam) {
        combinedQuestions = [...combinedQuestions, ...lesson.finalExam];
      }
    });

    // If there are more than 10 questions, shuffle and pick 10. If fewer, just use them all.
    if (combinedQuestions.length > 10) {
      combinedQuestions = combinedQuestions.sort(() => 0.5 - Math.random()).slice(0, 10);
    } else if (combinedQuestions.length === 0) {
      // Fallback if no specific questions exist, shouldn't normally happen
      import('../data/blockExamQuestions').then(module => {
         const shuffled = [...module.blockExamQuestions].sort(() => 0.5 - Math.random());
         setQuestions(shuffled.slice(0, 10));
      });
      return;
    }
    setQuestions(combinedQuestions);
  }, [milestone, lessonsInBlock]);

  const isAllAnswered = questions.length > 0 && questions.every(q => answers[q.id] !== undefined);

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    setCorrectCount(correct);
    setScore(finalScore);
    setSubmitted(true);
    
    // Scroll to results
    setTimeout(() => {
      const resultsEl = document.getElementById('block-exam-results');
      if (resultsEl) {
        resultsEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const minRequired = Math.ceil(questions.length * 0.7) || 1;
  const isPassed = correctCount >= minRequired; // Require 70% correct

  return (
    <div className="fixed inset-0 z-50 bg-[#1A2533]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto block-exam-container h-full w-full">
      <div className="bg-[#FAF9F6] border-2 border-[#E0D7C6] rounded-2xl w-full max-w-4xl shadow-2xl flex flex-col my-8 animate-in zoom-in-95 duration-500 max-h-[90vh]">
        
        {/* Academic Header */}
        <div className="bg-[#1A2533] text-white p-6 md:p-8 shrink-0 border-b border-[#2C3E50] relative overflow-hidden text-center rounded-t-2xl">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <ScrollText size={120} />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#7F1D1D] rounded-full text-[10px] font-bold uppercase tracking-widest text-[#FDE68A] mb-3 border border-[#7F1D1D]/50">
            <Award size={12} /> Tribunal Académico del Seminario
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-tight text-white mb-2">
            Examen de Consolidación de Bloque
          </h2>
          <p className="text-gray-300 text-xs md:text-sm max-w-xl mx-auto font-sans leading-relaxed">
            Has completado <strong className="text-white font-bold">{lessonsInBlock.length} clases</strong> en este bloque. Para convalidar y certificar tus avances, se requiere contestar este escrutinio general de {questions.length} reactivos interactivos de las clases que acabas de ver.
          </p>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 bg-[#2C3E50]/40 px-4 py-2 rounded-lg border border-[#3E5C76]/30 text-xs font-sans font-medium text-gray-200">
            <span>Mínimo requerido: <strong className="text-emerald-400 font-bold">{minRequired} de {questions.length} aciertos (70%)</strong></span>
            <span className="text-gray-500 hidden md:inline">|</span>
            <span className="text-red-300">Penalización por reprobar: Regresar al Día {lessonsInBlock[0]?.day || 1} de <strong className="italic text-white">{courseTitle}</strong></span>
          </div>
        </div>

        {/* Scrollable Questions list */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-12 custom-scrollbar">
          {questions.map((q, index) => {
            const selectedIdx = answers[q.id];
            const isCorrect = selectedIdx === q.correctAnswerIndex;

            return (
              <div key={q.id} className="bg-white border border-[#E0D7C6]/60 rounded-xl p-5 md:p-8 shadow-sm space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="font-bold text-[#1A2533] text-lg flex gap-3 leading-relaxed font-serif">
                  <span className="text-[#7F1D1D] font-black shrink-0">{index + 1}.</span>
                  {q.question}
                </h3>

                <div className="space-y-2 pl-0 md:pl-7">
                  {q.options.map((opt, i) => {
                    let btnClass = "w-full text-left flex items-center gap-3 p-3.5 border rounded-lg bg-white transition-all text-sm font-sans text-gray-700 leading-snug";
                    
                    if (!submitted) {
                      if (selectedIdx === i) {
                        btnClass += " border-[#7F1D1D] bg-red-50 text-red-950 shadow-sm ring-1 ring-[#7F1D1D]/50 font-medium";
                      } else {
                        btnClass += " border-[#E0D7C6] hover:border-[#1A2533] hover:bg-gray-50/50 cursor-pointer hover:shadow-sm";
                      }
                    } else {
                      if (i === q.correctAnswerIndex) {
                        btnClass += " border-emerald-500 bg-emerald-50 text-emerald-950 shadow-sm font-medium";
                      } else if (i === selectedIdx) {
                        btnClass += " border-red-300 bg-red-50 text-red-950 opacity-90 cursor-not-allowed";
                      } else {
                        btnClass += " border-gray-200 text-gray-400 cursor-not-allowed opacity-60";
                      }
                    }

                    return (
                      <button
                        key={i}
                        disabled={submitted}
                        onClick={() => setAnswers(prev => ({ ...prev, [q.id]: i }))}
                        className={btnClass}
                      >
                        <div className={`w-5 h-5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                          submitted && i === q.correctAnswerIndex ? 'border-emerald-500 bg-emerald-500 text-white' :
                          selectedIdx === i ? 'border-[#7F1D1D] bg-[#7F1D1D]' : 'border-gray-300'
                        }`}>
                          {(selectedIdx === i || (submitted && i === q.correctAnswerIndex)) && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="flex-grow">{opt}</span>
                        {submitted && i === q.correctAnswerIndex && <CheckCircle2 size={16} className="text-emerald-600 shrink-0 ml-1.5" />}
                        {submitted && i === selectedIdx && i !== q.correctAnswerIndex && <XCircle size={16} className="text-red-500 shrink-0 ml-1.5" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-4 md:ml-7 p-4 rounded-xl text-xs font-sans flex flex-col gap-1.5 border leading-relaxed ${isCorrect ? 'bg-emerald-50/60 text-emerald-950 border-emerald-100' : 'bg-red-50/60 text-red-950 border-red-100'}`}>
                    <div className="font-bold uppercase tracking-widest text-[10px] text-gray-500">Fundamento Teológico:</div>
                    <div>{q.explanation}</div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Results Block section when submitted */}
          {submitted && (
            <div id="block-exam-results" className="p-8 rounded-2xl text-center flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-700 bg-white border border-[#E0D7C6]">
              {isPassed ? (
                <>
                  <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4 border border-emerald-100 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-emerald-800 font-serif mb-2">¡EXAMEN CONVALIDADO!</h3>
                  <p className="text-gray-500 text-sm font-sans max-w-md mb-6 leading-relaxed">
                    Has respondido correctamente <strong className="text-emerald-600 font-bold">{correctCount} de {questions.length} preguntas</strong> ({score}%). Tu aprehensión doctrinal es idónea y rigurosa. Puedes proceder de inmediato a las siguientes clases del seminario.
                  </p>
                  <button
                    onClick={() => onPass(score)}
                    className="bg-[#1A2533] hover:bg-black text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-lg shadow-md transition-colors"
                  >
                    Marcar Bloque como Acreditado
                  </button>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-4 border border-red-100 animate-pulse">
                    <AlertTriangle size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-red-800 font-serif mb-2">EXAMEN NO ACREDITADO</h3>
                  <p className="text-gray-500 text-sm font-sans max-w-md mb-4 leading-relaxed">
                    Obtuviste <strong className="text-red-600 font-bold">{correctCount} de {questions.length} aciertos</strong> ({score}%). El estándar académico del seminario requiere un mínimo de {minRequired} para convalidar este bloque técnico.
                  </p>
                  <div className="bg-[#FAF9F6] border border-[#E0D7C6] p-4 rounded-xl text-left max-w-md w-full mb-6 flex gap-3 text-xs leading-relaxed text-[#5C5C5C] font-sans">
                    <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1A2533] font-bold block mb-1">Medida Correctiva Aplicada:</strong>
                      Para garantizar la excelencia bíblica, deberás repasar las bases sólidas volviendo a tomar la primera clase del curso activo:
                      <div className="mt-1.5 font-bold text-[#7F1D1D] bg-[#7F1D1D]/5 py-1 px-2 rounded border border-[#7F1D1D]/10 flex items-center gap-1.5">
                        <BookOpen size={12} /> {firstLessonTitle}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onFail(score)}
                    className="bg-[#7F1D1D] hover:bg-red-950 text-white font-sans text-xs font-bold uppercase tracking-widest px-8 py-3.5 rounded-lg shadow-md transition-colors flex items-center gap-2"
                  >
                    <RefreshCw size={14} /> Reestablecer y Retomar Clase
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Footer actions before submission */}
        {!submitted && (
          <div className="p-6 bg-gray-50 border-t border-[#E0D7C6] shrink-0 flex justify-between items-center rounded-b-2xl font-sans">
            <span className="text-xs font-semibold text-gray-500">
              {Object.keys(answers).length} de {questions.length} contestadas
            </span>
            <button
              onClick={handleSubmit}
              disabled={!isAllAnswered}
              className="bg-[#1A2533] hover:bg-black text-white px-8 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow"
            >
              Calificar Examen
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
