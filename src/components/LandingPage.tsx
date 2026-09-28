import { LogIn, BookOpen, ScrollText, GraduationCap, ArrowRight, Library, Users, Sparkles, AlertTriangle, ExternalLink, UserCheck } from 'lucide-react';

interface LandingPageProps {
  onSignIn: () => void;
  onSignInAsGuest?: () => void;
  authError?: string | null;
}

export function LandingPage({ onSignIn, onSignInAsGuest, authError }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] font-serif text-[#2C2C2C] flex flex-col">
      {/* Header */}
      <header className="h-20 bg-[#1A2533] text-white border-b border-[#2C3E50] px-6 md:px-12 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-[#E0D7C6] leading-none">SEMINARIO</h1>
            <span className="text-[10px] font-normal opacity-80 uppercase tracking-[0.2em] font-sans">Teológico Digital</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {onSignInAsGuest && (
            <button 
              onClick={onSignInAsGuest}
              className="hidden sm:flex text-gray-300 hover:text-white text-xs font-semibold tracking-wider uppercase transition-all items-center gap-1.5 px-3 py-2 rounded hover:bg-white/10 font-sans cursor-pointer"
            >
              <UserCheck size={16} />
              <span>Modo Invitado</span>
            </button>
          )}
          <button 
            onClick={onSignIn}
            className="bg-white text-[#1A2533] hover:bg-[#E0D7C6] active:scale-95 px-4 sm:px-5 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-all flex items-center gap-2 shadow-sm font-sans relative z-20 cursor-pointer"
          >
            <LogIn size={16} />
            <span>Iniciar Sesión</span>
          </button>
        </div>
      </header>

      {authError && (
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-5 font-sans animate-in fade-in slide-in-from-top duration-300">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-start">
            <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h3 className="font-bold text-amber-900 text-base">Error de Autenticación (Dominio no Autorizado)</h3>
                {onSignInAsGuest && (
                  <button
                    onClick={onSignInAsGuest}
                    className="self-start sm:self-auto bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <UserCheck size={14} />
                    Entrar como Invitado Ahora
                  </button>
                )}
              </div>
              <p className="text-amber-800 text-sm leading-relaxed">
                {authError} Puedes ingresar inmediatamente con el botón <strong>"Entrar como Invitado"</strong> para explorar todas las clases, o agregar este dominio a la lista de permitidos en tu panel de Firebase:
              </p>
              <div className="bg-white/80 border border-amber-200 rounded-lg p-4 mt-3 text-sm text-amber-900 space-y-3">
                <p className="font-semibold">Siga estos sencillos pasos para resolverlo:</p>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-amber-800 leading-relaxed font-sans">
                  <li>
                    Abra la <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="font-bold underline inline-flex items-center gap-0.5 hover:text-amber-950">Consola de Firebase <ExternalLink size={12} /></a> e ingrese a su proyecto <code className="bg-amber-100/50 px-1.5 py-0.5 rounded font-mono font-bold">mudix-489022</code>.
                  </li>
                  <li>
                    En el menú lateral izquierdo, vaya a la sección de <strong className="text-amber-900">Build (Compilación)</strong> y haga clic en <strong className="text-amber-900">Authentication</strong>.
                  </li>
                  <li>
                    Diríjase a la pestaña de <strong className="text-amber-900">Settings (Configuración)</strong> en la barra superior.
                  </li>
                  <li>
                    En la sección de <strong className="text-amber-900">Authorized domains (Dominios autorizados)</strong> (abajo a la derecha), haga clic en <strong className="text-amber-900">Add domain (Añadir dominio)</strong>.
                  </li>
                  <li>
                    Escriba <code className="bg-amber-100/50 px-1.5 py-0.5 rounded font-mono font-bold">{window.location.hostname}</code> y guarde los cambios.
                  </li>
                </ol>
                <p className="text-xs text-amber-600 italic">Una vez guardado, regrese aquí y presione de nuevo el botón de "Iniciar Sesión".</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative bg-[#1A2533] text-white overflow-hidden py-24 md:py-32 px-6">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] mix-blend-overlay"></div>
          
          <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#E0D7C6]/30 bg-[#E0D7C6]/10 text-[#E0D7C6] text-xs font-bold uppercase tracking-widest font-sans mb-8">
               <Sparkles size={14} />
               Formación Académica y Ministerial
             </div>
             <h2 className="text-3xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1] text-white">
               Rigor Exegético para la <span className="text-[#E0D7C6] italic">Iglesia Moderna</span>
             </h2>
             <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
               Una plataforma educativa diseñada para profundizar en las Escrituras a través del método histórico-crítico, teología sistemática y herramientas ministeriales avanzadas.
             </p>
             <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
               <button 
                onClick={onSignIn}
                className="w-full sm:w-auto bg-[#7F1D1D] hover:bg-red-800 active:scale-95 text-white px-8 py-4 rounded text-sm font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl md:hover:-translate-y-1 font-sans relative z-20 cursor-pointer"
              >
                Comenzar con Google
                <ArrowRight size={18} />
              </button>
              {onSignInAsGuest && (
                <button 
                  onClick={onSignInAsGuest}
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/30 px-6 py-4 rounded text-sm font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 font-sans relative z-20 cursor-pointer"
                >
                  <UserCheck size={18} className="text-[#E0D7C6]" />
                  Explorar como Invitado
                </button>
              )}
             </div>
          </div>
        </section>

        {/* Methodology Section */}
        <section className="py-20 px-6 bg-white border-b border-[#E0D7C6]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#7F1D1D] font-sans mb-2">Pedagogía Digital</h3>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1A2533]">Método de Estudio Micro-Modular</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10">
              <div className="text-center md:text-left flex flex-col items-center md:items-start">
                <div className="w-16 h-16 bg-[#FDFCFB] border border-[#E0D7C6] rounded-xl flex items-center justify-center text-[#1A2533] mb-6 shadow-sm">
                  <Library size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold text-[#1A2533] mb-3">Lectura Diaria</h4>
                <p className="text-gray-600 leading-relaxed">Lecciones estructuradas bajo la metodología de "1 clase por día". Desarrolla el hábito del estudio consistente y profundo sin abrumarte.</p>
              </div>
              <div className="text-center md:text-left flex flex-col items-center md:items-start">
                <div className="w-16 h-16 bg-[#FDFCFB] border border-[#E0D7C6] rounded-xl flex items-center justify-center text-[#1A2533] mb-6 shadow-sm">
                  <BookOpen size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold text-[#1A2533] mb-3">Control de Lectura</h4>
                <p className="text-gray-600 leading-relaxed">Interrupciones hermenéuticas con preguntas sencillas entre párrafos para mantener la atención y asegurar la aprehensión del texto.</p>
              </div>
              <div className="text-center md:text-left flex flex-col items-center md:items-start">
                <div className="w-16 h-16 bg-[#FDFCFB] border border-[#E0D7C6] rounded-xl flex items-center justify-center text-[#1A2533] mb-6 shadow-sm">
                  <GraduationCap size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold text-[#1A2533] mb-3">Escudriño Final</h4>
                <p className="text-gray-600 leading-relaxed">Evaluaciones comprensivas al final de cada unidad con retroalimentación teológica inmediata sobre por qué una respuesta es correcta o errónea.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Divisions Section */}
        <section className="py-24 px-6 bg-[#FDFCFB]">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            
            <div className="flex-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded border border-[#7F1D1D]/20 bg-[#7F1D1D]/5 text-[#7F1D1D] text-xs font-bold uppercase tracking-widest font-sans">
                <Users size={14} />
                Plan de Estudios
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-[#1A2533] leading-tight">
                Dos rutas hacia la excelencia ministerial
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Nuestra plataforma cubre el espectro completo del deber pastoral y teológico, dividiendo la carga académica en dos vertientes interconectadas:
              </p>
              
              <div className="space-y-6 pt-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-[#E0D7C6]/20 border border-[#E0D7C6] text-[#7F1D1D] rounded flex items-center justify-center font-bold font-sans">01</div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1A2533] mb-2">División Exegética</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Estudio expositivo, libro por libro y versículo por versículo. Análisis filológico, histórico y literario de los textos en su idioma y contexto original.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 bg-[#E0D7C6]/20 border border-[#E0D7C6] text-[#7F1D1D] rounded flex items-center justify-center font-bold font-sans">02</div>
                  <div>
                    <h4 className="text-xl font-bold text-[#1A2533] mb-2">Cursos Especializados</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">Academias sistemáticas y prácticas: Homilética, Apologética, Hermenéutica, Exégesis Clásica y Teología Sistemática/Bíblica.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full max-w-lg relative">
              <div className="absolute inset-0 bg-[#7F1D1D] rounded-2xl transform rotate-3 scale-105 opacity-10"></div>
              <div className="bg-white border border-[#E0D7C6] rounded-2xl p-8 shadow-xl relative z-10">
                <h3 className="text-lg font-bold text-[#1A2533] mb-6 border-b border-[#F0E6D2] pb-4">Módulos Abiertos</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-[#E0D7C6] rounded hover:border-[#7F1D1D] transition-colors bg-gray-50/50">
                    <div className="text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Cursos Especializados</div>
                    <div className="font-bold text-[#1A2533]">Exégesis Clásica: Introducción</div>
                  </div>
                  <div className="p-4 border border-[#E0D7C6] rounded hover:border-[#7F1D1D] transition-colors bg-gray-50/50">
                    <div className="text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Cursos Especializados</div>
                    <div className="font-bold text-[#1A2533]">Teología Sistemática I: Bibliología</div>
                  </div>
                  <div className="p-4 border border-[#E0D7C6] rounded hover:border-[#7F1D1D] transition-colors bg-gray-50/50">
                    <div className="text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Cursos Especializados</div>
                    <div className="font-bold text-[#1A2533]">Homilética y Predicación</div>
                  </div>
                  <div className="p-4 border border-[#E0D7C6] rounded hover:border-[#7F1D1D] transition-colors bg-gray-50/50">
                    <div className="text-[10px] text-gray-500 font-sans font-bold uppercase tracking-widest mb-1">Estudio Bíblico</div>
                    <div className="font-bold text-[#1A2533]">Génesis 1:1-5 - Orígenes</div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-2 mt-6">
                  <button 
                    onClick={onSignIn}
                    className="flex-1 bg-[#1A2533] hover:bg-[#2C3E50] active:scale-95 text-white py-3 rounded text-xs font-bold tracking-widest uppercase transition-all font-sans relative z-20 cursor-pointer text-center"
                  >
                    Iniciar con Google
                  </button>
                  {onSignInAsGuest && (
                    <button 
                      onClick={onSignInAsGuest}
                      className="flex-1 bg-stone-100 hover:bg-stone-200 text-[#1A2533] border border-stone-300 py-3 rounded text-xs font-bold tracking-widest uppercase transition-all font-sans relative z-20 cursor-pointer text-center"
                    >
                      Entrar como Invitado
                    </button>
                  )}
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#111A24] text-white py-12 px-6 border-t border-[#2C3E50]">
         <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <div>
                <h1 className="text-lg font-bold tracking-tight text-[#E0D7C6] leading-none">SEMINARIO</h1>
                <span className="text-[9px] font-normal opacity-60 uppercase tracking-[0.2em] font-sans">Teológico Digital</span>
              </div>
            </div>
            <div className="text-xs text-gray-500 font-sans">
              &copy; {new Date().getFullYear()} Seminario Teológico Digital. Todos los derechos reservados.
            </div>
         </div>
      </footer>
    </div>
  );
}
