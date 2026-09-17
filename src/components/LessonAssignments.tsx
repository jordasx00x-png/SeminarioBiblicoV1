import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, 
  UploadCloud, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Award, 
  BookOpen, 
  Sparkles, 
  RotateCcw, 
  FileCheck, 
  ChevronDown, 
  ChevronUp, 
  Download, 
  Copy, 
  Check, 
  Edit3, 
  FileCode,
  ShieldCheck,
  HelpCircle,
  BarChart3
} from 'lucide-react';
import { safeStorage } from '../utils/safeStorage';
import { 
  evaluateAssignmentSubmission, 
  AssignmentEvaluationResult 
} from '../utils/assignmentEvaluator';

interface AssignmentItem {
  id: string;
  description: string;
}

interface LessonAssignmentsProps {
  lessonId: string;
  courseId: string;
  assignments: AssignmentItem[];
  lessonTitle?: string;
}

interface StoredSubmission {
  documentText: string;
  fileName?: string;
  evaluation?: AssignmentEvaluationResult;
  updatedAt: string;
}

export function LessonAssignments({ 
  lessonId, 
  courseId, 
  assignments, 
  lessonTitle = 'Lección del Seminario' 
}: LessonAssignmentsProps) {
  // Store submissions map: assignmentId -> StoredSubmission
  const [submissions, setSubmissions] = useState<Record<string, StoredSubmission>>({});
  const [activeAssignmentId, setActiveAssignmentId] = useState<string>(assignments[0]?.id || '');
  const [inputMode, setInputMode] = useState<'upload' | 'editor' | 'rubric'>('editor');
  
  // Editor state for active assignment
  const [currentText, setCurrentText] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationStage, setEvaluationStage] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storageKey = `doc_assignments_${courseId}_${lessonId}`;

  // Load submissions from storage
  useEffect(() => {
    const saved = safeStorage.getItem(storageKey);
    if (saved) {
      try {
        const parsed: Record<string, StoredSubmission> = JSON.parse(saved);
        setSubmissions(parsed);
        if (activeAssignmentId && parsed[activeAssignmentId]) {
          setCurrentText(parsed[activeAssignmentId].documentText || '');
          setCurrentFileName(parsed[activeAssignmentId].fileName || '');
        }
      } catch (e) {
        console.error('Error loading submissions', e);
      }
    }
  }, [lessonId, courseId, storageKey]);

  // When active assignment changes, update editor text
  useEffect(() => {
    if (activeAssignmentId && submissions[activeAssignmentId]) {
      setCurrentText(submissions[activeAssignmentId].documentText || '');
      setCurrentFileName(submissions[activeAssignmentId].fileName || '');
    } else {
      setCurrentText('');
      setCurrentFileName('');
    }
  }, [activeAssignmentId]);

  if (!assignments || assignments.length === 0) return null;

  const currentAssignment = assignments.find(a => a.id === activeAssignmentId) || assignments[0];
  const activeSubmission = submissions[currentAssignment.id];
  const currentEvaluation = activeSubmission?.evaluation;

  // Word & character stats
  const wordCount = currentText.trim().length > 0 ? currentText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = currentText.length;
  const estimatedReadMins = Math.max(1, Math.ceil(wordCount / 180));

  // Handle auto-save draft
  const handleTextChange = (text: string) => {
    setCurrentText(text);
    const updatedSubmissions = {
      ...submissions,
      [currentAssignment.id]: {
        ...(submissions[currentAssignment.id] || {}),
        documentText: text,
        fileName: currentFileName,
        updatedAt: new Date().toISOString()
      }
    };
    setSubmissions(updatedSubmissions);
    safeStorage.setItem(storageKey, JSON.stringify(updatedSubmissions));
  };

  // Handle File Upload
  const handleFileUpload = (file: File) => {
    if (!file) return;

    setCurrentFileName(file.name);

    // If it's a text/markdown/code file
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        handleTextChange(result);
        setInputMode('editor');
      }
    };

    // For plain text, markdown, or binary files read as text
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Pre-load structured template
  const insertAcademicTemplate = () => {
    const template = `TÍTULO DEL ENSAYO TEOLÓGICO: ${currentAssignment.description.slice(0, 50)}...
AUTOR / ESTUDIANTE: Seminario Teológico Digital
FECHA: ${new Date().toLocaleDateString('es-ES')}

1. INTRODUCCIÓN Y PLANTEAMIENTO DOCTRINAL
En este trabajo se aborda el análisis sistemático y exegético del tema propuesto, reconociendo la primacía de la Sagrada Escritura como norma normans non normata.

2. DESARROLLO EXEGÉTICO Y FUNDAMENTACIÓN BÍBLICA
Al examinar los pasajes pertinentes (ej. Romanos 3:21-26; 2 Timoteo 2:15; Gálatas 2:16), observamos que el texto sagrado establece con claridad la suficiencia de la gracia de Cristo. El contexto histórico-gramatical nos revela la intención original del autor inspirado...

3. DIÁLOGO DOCTRINAL Y RIGOR TEOLÓGICO
Frente a las posturas contemporáneas que reducen la fe a mero sentimentalismo, la ortodoxia cristiana histórica defiende la soberanía de Dios y la justificación forense por la sola fe...

4. APLICACIÓN PASTORAL Y DEVOCIÓN PRÁCTICA
Toda verdad teológica debe aterrizar en la edificación de la iglesia local y en una vida de santidad práctica. Para el creyente de hoy, esto implica descansar plenamente en las promesas del Evangelio...

5. CONCLUSIÓN
Concluimos reafirmando que el rigor en el estudio bíblico no compite con la piedad, sino que la nutre para la gloria exclusiva de Dios (Soli Deo Gloria).`;

    handleTextChange(template);
    setInputMode('editor');
  };

  // Execute Corroboration / Evaluation
  const runEvaluation = () => {
    if (wordCount < 15) {
      alert('Por favor redacte o cargue un documento con al menos 15 a 20 palabras para que el sistema pueda evaluar la argumentación académica.');
      return;
    }

    setIsEvaluating(true);
    setEvaluationStage(1);

    // Simulate progressive academic scanning stages
    setTimeout(() => setEvaluationStage(2), 500);
    setTimeout(() => setEvaluationStage(3), 1000);
    setTimeout(() => {
      const evaluationResult = evaluateAssignmentSubmission(
        currentText,
        currentAssignment.description,
        lessonTitle
      );

      const updatedSubmissions = {
        ...submissions,
        [currentAssignment.id]: {
          documentText: currentText,
          fileName: currentFileName,
          evaluation: evaluationResult,
          updatedAt: new Date().toISOString()
        }
      };

      setSubmissions(updatedSubmissions);
      safeStorage.setItem(storageKey, JSON.stringify(updatedSubmissions));
      setIsEvaluating(false);
      setEvaluationStage(0);
    }, 1600);
  };

  // Copy evaluation summary
  const copyEvaluationReport = () => {
    if (!currentEvaluation) return;
    const report = `=========================================
DICTAMEN ACADÉMICO DE EVALUACIÓN DE TAREA
Seminario Teológico Digital
=========================================
Lección: ${lessonTitle}
Tarea: ${currentAssignment.description}
Calificación: ${currentEvaluation.score}/100 (${currentEvaluation.gradeLetter})
Estado: ${currentEvaluation.statusText}
Palabras evaluadas: ${currentEvaluation.wordCount}
Citas bíblicas identificadas: ${currentEvaluation.detectedVerses.join(', ') || 'Ninguna'}

CRITERIOS:
${currentEvaluation.criteria.map(c => `• ${c.name} (${c.score}/100): ${c.feedback}`).join('\n')}

SÍNTESIS TEOLÓGICA:
${currentEvaluation.theologicalSummary}
=========================================`;

    navigator.clipboard.writeText(report);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Total completed & approved tasks count
  const approvedTasksCount = assignments.filter(a => {
    const sub = submissions[a.id];
    return sub?.evaluation?.passed;
  }).length;
  const overallProgress = Math.round((approvedTasksCount / assignments.length) * 100);

  return (
    <section className="bg-white dark:bg-slate-900 border border-[#E0D7C6] dark:border-slate-800 rounded-xl overflow-hidden shadow-sm flex flex-col font-sans mb-8">
      {/* Top Header */}
      <div className="bg-[#1A2533] border-b border-[#2C3E50] px-5 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-[#D1B17F]/20 text-[#E0D7C6]">
            <FileText size={20} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#E0D7C6] uppercase tracking-wider flex items-center gap-2">
              <span>Centro de Entrega y Evaluación de Tareas en Documento</span>
              <span className="text-[10px] bg-emerald-900/80 text-emerald-300 px-2 py-0.5 rounded-full font-mono border border-emerald-700">
                Corroboración Automática
              </span>
            </h3>
            <p className="text-xs text-gray-400">
              Suba su archivo o redacte su ensayo académico. El sistema evaluará su rigor teológico, citas bíblicas y coherencia.
            </p>
          </div>
        </div>

        {/* Global Progress */}
        <div className="flex items-center gap-3 bg-stone-900/60 px-3 py-1.5 rounded-lg border border-white/10">
          <div className="text-right">
            <span className="text-[10px] text-gray-300 uppercase font-bold block">Tareas Acreditadas</span>
            <span className="text-xs font-mono font-bold text-emerald-400">{approvedTasksCount} de {assignments.length}</span>
          </div>
          <div className="w-16 h-2 bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500 rounded-full"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-4 md:p-6 bg-[#FDFCFB] dark:bg-slate-900">
        {/* Assignments Selector Tabs */}
        {assignments.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 border-b border-stone-200">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider shrink-0 mr-1">
              Seleccionar Tarea:
            </span>
            {assignments.map((assignment, idx) => {
              const sub = submissions[assignment.id];
              const isPassed = sub?.evaluation?.passed;
              const isCurrent = assignment.id === activeAssignmentId;

              return (
                <button
                  key={assignment.id}
                  onClick={() => setActiveAssignmentId(assignment.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                    isCurrent 
                      ? 'bg-[#1A2533] text-white shadow-xs' 
                      : 'bg-white border border-stone-200 text-gray-700 hover:bg-stone-50'
                  }`}
                >
                  <span>Tarea #{idx + 1}</span>
                  {isPassed ? (
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  ) : sub?.evaluation ? (
                    <AlertTriangle size={13} className="text-amber-400 shrink-0" />
                  ) : (
                    <Clock size={13} className="text-gray-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Active Assignment Objective Card */}
        <div className="bg-[#FAF9F6] border-l-4 border-[#7F1D1D] p-4 rounded-r-lg mb-5 border border-[#E0D7C6]/60">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7F1D1D]">
              Objetivo y Consigna Académica
            </span>
            {currentEvaluation && (
              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${
                currentEvaluation.passed 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-amber-50 text-amber-800 border-amber-200'
              }`}>
                Calificación: {currentEvaluation.score}/100 ({currentEvaluation.gradeLetter})
              </span>
            )}
          </div>
          <p className="text-sm md:text-base font-serif text-[#1A2533] leading-relaxed">
            {currentAssignment.description}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200">
            <button
              onClick={() => setInputMode('editor')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                inputMode === 'editor' 
                  ? 'bg-white text-[#1A2533] shadow-xs' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <Edit3 size={14} />
              <span>Editor de Documento</span>
            </button>
            <button
              onClick={() => setInputMode('upload')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                inputMode === 'upload' 
                  ? 'bg-white text-[#1A2533] shadow-xs' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <UploadCloud size={14} />
              <span>Subir Archivo (.doc, .txt, .pdf)</span>
            </button>
            <button
              onClick={() => setInputMode('rubric')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
                inputMode === 'rubric' 
                  ? 'bg-white text-[#1A2533] shadow-xs' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              <ShieldCheck size={14} />
              <span>Criterios de Evaluación</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={insertAcademicTemplate}
              className="text-xs text-[#7F1D1D] hover:text-red-900 bg-amber-50 hover:bg-amber-100 border border-[#D1B17F]/60 px-2.5 py-1.5 rounded-md font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Insertar esquema formal de ensayo teológico"
            >
              <FileCode size={13} />
              <span className="hidden sm:inline">Cargar Plantilla Académica</span>
            </button>
          </div>
        </div>

        {/* 1. UPLOAD FILE PANEL */}
        {inputMode === 'upload' && (
          <div className="mb-5">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
                isDragOver 
                  ? 'border-[#7F1D1D] bg-amber-50/50 scale-[0.99]' 
                  : 'border-stone-300 hover:border-[#D1B17F] bg-white hover:bg-stone-50/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.doc,.docx,.pdf,.rtf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
              <UploadCloud size={40} className="mx-auto text-[#7F1D1D] mb-3 opacity-80" />
              <h4 className="text-sm font-bold text-[#1A2533] mb-1">
                Arrastre y suelte su archivo de tarea aquí, o haga clic para seleccionar
              </h4>
              <p className="text-xs text-gray-500 max-w-md mx-auto mb-4">
                Formatos aceptados: Documentos de texto (.txt, .md, .doc, .docx, .pdf, .rtf). El contenido se extraerá automáticamente para su corroboración.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1A2533] text-white text-xs font-bold uppercase tracking-wider">
                <FileText size={14} />
                <span>Explorar Archivos en su Equipo</span>
              </div>
            </div>

            {currentFileName && (
              <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-900 text-xs font-bold">
                  <FileCheck size={16} className="text-emerald-600" />
                  <span>Archivo cargado: <strong>{currentFileName}</strong></span>
                </div>
                <span className="text-[11px] text-emerald-700 font-mono">
                  {wordCount} palabras extraídas
                </span>
              </div>
            )}
          </div>
        )}

        {/* 2. RUBRIC INFO PANEL */}
        {inputMode === 'rubric' && (
          <div className="mb-5 bg-[#FAF9F6] border border-[#E0D7C6] rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold text-[#1A2533] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#7F1D1D]" />
              Rúbrica Oficial de Corroboración Teológica (100 Puntos)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white border border-stone-200 rounded-lg">
                <div className="font-bold text-[#7F1D1D] flex items-center justify-between mb-1">
                  <span>1. Rigor Exegético y Teológico</span>
                  <span>25%</span>
                </div>
                <p className="text-gray-600">
                  Uso correcto de terminología bíblica, comprensión de las doctrinas centrales de la gracia y precisión conceptual.
                </p>
              </div>
              <div className="p-3 bg-white border border-stone-200 rounded-lg">
                <div className="font-bold text-[#7F1D1D] flex items-center justify-between mb-1">
                  <span>2. Fundamentación Bíblica & Citas</span>
                  <span>25%</span>
                </div>
                <p className="text-gray-600">
                  Citas textuales de la Escritura con referencias de libro, capítulo y versículo interactuando con el argumento.
                </p>
              </div>
              <div className="p-3 bg-white border border-stone-200 rounded-lg">
                <div className="font-bold text-[#7F1D1D] flex items-center justify-between mb-1">
                  <span>3. Estructura y Coherencia</span>
                  <span>25%</span>
                </div>
                <p className="text-gray-600">
                  Desarrollo ordenado con introducción, desarrollo, análisis crítico y síntesis conclusiva (mínimo 150-300 palabras).
                </p>
              </div>
              <div className="p-3 bg-white border border-stone-200 rounded-lg">
                <div className="font-bold text-[#7F1D1D] flex items-center justify-between mb-1">
                  <span>4. Aplicación Pastoral y Práctica</span>
                  <span>25%</span>
                </div>
                <p className="text-gray-600">
                  Aterrizaje en la vida del creyente, la comunidad eclesial, la santificación y el ministerio del Evangelio.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 3. DOCUMENT TEXTAREA EDITOR */}
        <div className="relative border border-[#E0D7C6] rounded-xl overflow-hidden bg-white shadow-2xs focus-within:border-[#7F1D1D] transition-colors mb-4">
          {/* Editor Header Bar */}
          <div className="bg-stone-50 border-b border-stone-200 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-700 font-serif">Documento de Entrega</span>
              {currentFileName && (
                <span className="text-gray-500 font-mono text-[11px] bg-stone-200 px-2 py-0.5 rounded">
                  {currentFileName}
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span><strong>{wordCount}</strong> palabras</span>
              <span><strong>{charCount}</strong> caracteres</span>
              <span className="hidden sm:inline">~{estimatedReadMins} min lectura</span>
            </div>
          </div>

          {/* Text Area */}
          <textarea
            value={currentText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Escriba aquí el desarrollo de su tarea, ensayo o investigación teológica. También puede pegar su texto o usar la pestaña 'Subir Archivo' para cargar un documento desde su computadora..."
            className="w-full h-64 md:h-80 p-4 md:p-5 text-sm md:text-base font-serif leading-relaxed text-gray-900 bg-white focus:outline-none resize-y"
          />

          {/* Auto-save status footer */}
          <div className="bg-stone-50/70 border-t border-stone-200 px-4 py-2 flex items-center justify-between text-[11px] text-gray-500">
            <span className="flex items-center gap-1">
              <Check size={13} className="text-emerald-600" />
              Guardado automático local activo
            </span>
            {activeSubmission?.updatedAt && (
              <span>Última modificación: {new Date(activeSubmission.updatedAt).toLocaleTimeString('es-ES')}</span>
            )}
          </div>
        </div>

        {/* Action Button: Corroborate & Evaluate */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => {
              if (window.confirm('¿Desea limpiar el contenido de este documento?')) {
                handleTextChange('');
                setCurrentFileName('');
              }
            }}
            className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-700 transition-colors cursor-pointer"
          >
            Limpiar Editor
          </button>

          <button
            onClick={runEvaluation}
            disabled={isEvaluating || wordCount < 10}
            className={`px-6 py-3.5 rounded-xl font-bold text-xs md:text-sm uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md cursor-pointer ${
              wordCount < 10
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isEvaluating
                ? 'bg-[#1A2533] text-amber-300 animate-pulse'
                : 'bg-[#7F1D1D] hover:bg-red-800 text-white active:scale-95'
            }`}
          >
            {isEvaluating ? (
              <>
                <Sparkles size={18} className="animate-spin text-amber-300" />
                <span>
                  {evaluationStage === 1 && 'Analizando extensión y citas bíblicas...'}
                  {evaluationStage === 2 && 'Verificando rigor doctrinal y coherencia...'}
                  {evaluationStage === 3 && 'Generando dictamen académico...'}
                </span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Corroborar y Evaluar Tarea en el Sistema</span>
              </>
            )}
          </button>
        </div>

        {/* 4. EVALUATION RESULT REPORT */}
        {currentEvaluation && (
          <div className="mt-6 border-2 border-[#D1B17F] rounded-xl overflow-hidden bg-white shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header Banner */}
            <div className={`p-5 md:p-6 text-white flex flex-wrap items-center justify-between gap-4 ${
              currentEvaluation.passed ? 'bg-[#1A2533]' : 'bg-[#3A2418]'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-xl border ${
                  currentEvaluation.passed 
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-400/30' 
                    : 'bg-amber-500/20 text-amber-400 border-amber-400/30'
                }`}>
                  <Award size={28} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#E0D7C6] block">
                    Dictamen Oficial del Seminario
                  </span>
                  <h4 className="text-lg md:text-xl font-bold font-serif">
                    {currentEvaluation.statusText}
                  </h4>
                  <p className="text-xs text-gray-300">
                    Evaluado el {new Date(currentEvaluation.evaluatedAt).toLocaleDateString('es-ES')} a las {new Date(currentEvaluation.evaluatedAt).toLocaleTimeString('es-ES')}
                  </p>
                </div>
              </div>

              {/* Score Display */}
              <div className="flex items-center gap-4 bg-black/30 px-4 py-3 rounded-xl border border-white/10">
                <div className="text-center">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Calificación</span>
                  <span className="text-2xl md:text-3xl font-mono font-bold text-white">
                    {currentEvaluation.score}<span className="text-sm text-gray-400">/100</span>
                  </span>
                </div>
                <div className="w-px h-10 bg-white/20"></div>
                <div className="text-center">
                  <span className="text-[10px] text-gray-400 uppercase font-bold block">Rango</span>
                  <span className="text-2xl md:text-3xl font-serif font-bold text-amber-300">
                    {currentEvaluation.gradeLetter}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 md:p-8 space-y-6">
              {/* Summary */}
              <div className="bg-[#FAF9F6] border-l-4 border-[#D1B17F] p-4 rounded-r-lg">
                <h5 className="text-xs font-bold text-[#1A2533] uppercase tracking-wider mb-1">
                  Síntesis del Revisor Académico
                </h5>
                <p className="text-sm text-gray-800 leading-relaxed font-serif">
                  {currentEvaluation.theologicalSummary}
                </p>
              </div>

              {/* Detected items tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Citas Bíblicas Identificadas ({currentEvaluation.detectedVerses.length})
                  </span>
                  {currentEvaluation.detectedVerses.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {currentEvaluation.detectedVerses.map((v, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-amber-100 text-[#7F1D1D] text-xs font-bold border border-[#D1B17F]/40 font-mono">
                          📖 {v}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">No se detectaron citas bíblicas explícitas.</p>
                  )}
                </div>

                <div className="p-4 bg-stone-50 rounded-lg border border-stone-200">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
                    Términos Teológicos Clave ({currentEvaluation.detectedKeyTerms.length})
                  </span>
                  {currentEvaluation.detectedKeyTerms.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {currentEvaluation.detectedKeyTerms.slice(0, 8).map((t, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-blue-50 text-blue-900 text-xs font-medium border border-blue-200 capitalize">
                          {t}
                        </span>
                      ))}
                      {currentEvaluation.detectedKeyTerms.length > 8 && (
                        <span className="text-xs text-gray-500 self-center">
                          +{currentEvaluation.detectedKeyTerms.length - 8} más
                        </span>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-500 italic">Vocabulario teológico elemental.</p>
                  )}
                </div>
              </div>

              {/* Rubric Breakdown Progress Bars */}
              <div>
                <h5 className="text-xs font-bold text-[#1A2533] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  <BarChart3 size={15} className="text-[#7F1D1D]" />
                  Desglose Detallado por Criterios de Evaluación
                </h5>
                <div className="space-y-3">
                  {currentEvaluation.criteria.map((crit, idx) => (
                    <div key={idx} className="p-3 bg-white border border-stone-200 rounded-lg">
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-bold text-gray-800">{crit.name} (Peso: {crit.weight}%)</span>
                        <span className="font-mono font-bold text-[#7F1D1D]">{crit.score}/100</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mb-2">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${
                            crit.score >= 80 ? 'bg-emerald-500' : crit.score >= 65 ? 'bg-amber-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${crit.score}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-600">{crit.feedback}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-lg">
                  <h6 className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    Puntos Fuertes Destacados
                  </h6>
                  <ul className="space-y-1.5 text-xs text-emerald-950">
                    {currentEvaluation.strengths.map((str, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-600 font-bold">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-lg">
                  <h6 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <AlertTriangle size={15} className="text-amber-600" />
                    Observaciones y Sugerencias de Mejora
                  </h6>
                  <ul className="space-y-1.5 text-xs text-amber-950">
                    {currentEvaluation.improvements.map((imp, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-600 font-bold">•</span>
                        <span>{imp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Report Actions */}
              <div className="pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={copyEvaluationReport}
                  className="px-4 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-gray-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  {isCopied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  <span>{isCopied ? '¡Dictamen Copiado!' : 'Copiar Informe de Calificación'}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setInputMode('editor');
                      const el = document.querySelector('textarea');
                      if (el) el.focus();
                    }}
                    className="px-4 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-[#7F1D1D] border border-[#D1B17F] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw size={14} />
                    <span>Mejorar y Reenviar Tarea</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
