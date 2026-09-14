import React, { useState, useEffect } from 'react';
import { WifiOff, Download, CheckCircle, Database, HardDrive, Sparkles, X, PauseCircle, Layers } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';
import {
  getOfflineChapterCountAsync,
  downloadKeyChaptersForOffline,
  downloadFullBibleOffline,
  stopBibleDownload,
  TOTAL_BIBLE_CHAPTERS,
  DownloadProgress
} from '../utils/offlineStorage';

export function OfflineBanner() {
  const isOnline = useOnlineStatus();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Download states
  const [downloadMode, setDownloadMode] = useState<'idle' | 'key' | 'full'>('idle');
  const [keyProgress, setKeyProgress] = useState({ current: 0, total: 0, name: '' });
  const [fullProgress, setFullProgress] = useState<DownloadProgress | null>(null);
  const [savedCount, setSavedCount] = useState<number>(0);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);

  // Sync saved count on mount and periodically when open
  useEffect(() => {
    let active = true;
    getOfflineChapterCountAsync().then(count => {
      if (active) setSavedCount(count);
    });
    return () => { active = false; };
  }, [isModalOpen]);

  const refreshCount = async () => {
    const c = await getOfflineChapterCountAsync();
    setSavedCount(c);
  };

  const handleStartKeyDownload = async () => {
    setDownloadMode('key');
    setDownloadSuccessMessage(null);
    try {
      await downloadKeyChaptersForOffline((curr, tot, name) => {
        setKeyProgress({ current: curr, total: tot, name });
      });
      await refreshCount();
      setDownloadSuccessMessage('¡Colección de 26 capítulos clave guardada offline!');
    } catch (err) {
      console.error('Error downloading key chapters:', err);
    } finally {
      setDownloadMode('idle');
    }
  };

  const handleStartFullBibleDownload = async () => {
    setDownloadMode('full');
    setDownloadSuccessMessage(null);
    try {
      const res = await downloadFullBibleOffline((prog) => {
        setFullProgress(prog);
        setSavedCount(prog.completedChapters);
      });
      await refreshCount();
      if (res.success) {
        setDownloadSuccessMessage('¡La Biblia Completa (66 libros, 1,189 capítulos) ha sido descargada para uso 100% offline!');
      }
    } catch (err) {
      console.error('Error downloading full bible:', err);
    } finally {
      setDownloadMode('idle');
    }
  };

  const handleStopDownload = () => {
    stopBibleDownload();
    setDownloadMode('idle');
  };

  const fullPercent = fullProgress
    ? Math.min(100, Math.round((fullProgress.completedChapters / TOTAL_BIBLE_CHAPTERS) * 100))
    : 0;

  const isFullBibleComplete = savedCount >= TOTAL_BIBLE_CHAPTERS;

  return (
    <>
      {/* Floating Indicator */}
      <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2 font-sans">
        {!isOnline && (
          <div className="bg-amber-900/90 text-amber-100 backdrop-blur-md px-3.5 py-2 rounded-xl border border-amber-700/80 shadow-lg flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <WifiOff className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="font-bold">Modo Sin Conexión</span>
            <span className="hidden sm:inline text-amber-200">
              — Biblia y estudios guardados localmente
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="ml-1 underline hover:text-white text-[11px] font-bold"
            >
              Ver estado
            </button>
          </div>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1A2533] hover:bg-[#2C3E50] text-amber-200 border border-amber-500/30 px-3 py-1.5 rounded-xl shadow-md flex items-center gap-2 text-xs font-bold transition-all cursor-pointer"
          title="Gestor de Almacenamiento Offline de la Biblia"
        >
          <Database className="w-3.5 h-3.5 text-amber-400" />
          <span>Modo Offline ({savedCount}/{TOTAL_BIBLE_CHAPTERS})</span>
        </button>
      </div>

      {/* Offline Storage & Full Bible Download Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF9F6] dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden font-sans">
            
            {/* Header */}
            <div className="p-4 bg-[#1A2533] text-white flex items-center justify-between border-b border-[#2C3E50]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#7F1D1D] flex items-center justify-center border border-amber-500/30 text-amber-200">
                  <HardDrive className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                    Modo Offline & Descarga de la Biblia
                  </h3>
                  <p className="text-[11px] text-gray-300">
                    {isOnline ? '🟢 En línea — Descarga completa para lectura sin internet' : '🟠 Sin conexión — Leyendo desde almacenamiento local'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-5 space-y-4 text-xs text-gray-700 dark:text-gray-200 max-h-[80vh] overflow-y-auto">
              {/* Status Badge */}
              <div className="bg-amber-50 dark:bg-zinc-800/80 p-3.5 rounded-xl border border-amber-200 dark:border-zinc-700 space-y-1.5">
                <div className="flex items-center justify-between font-bold text-amber-900 dark:text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Capítulos en Dispositivo:
                  </span>
                  <span className="text-sm font-mono px-2.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-100 font-bold">
                    {savedCount} / {TOTAL_BIBLE_CHAPTERS} capítulos
                  </span>
                </div>
                <div className="w-full h-2 bg-amber-200/60 dark:bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-600 dark:bg-amber-400 transition-all duration-300"
                    style={{ width: `${Math.min(100, Math.round((savedCount / TOTAL_BIBLE_CHAPTERS) * 100))}%` }}
                  />
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300 leading-relaxed pt-1">
                  {isFullBibleComplete
                    ? '🎉 ¡Tienes la Biblia Completa (66 Libros y sus versiones) 100% disponible para consultar sin internet!'
                    : 'Los capítulos consultados y descargados se guardan automáticamente en la memoria local (IndexedDB) de tu navegador.'}
                </p>
              </div>

              {downloadSuccessMessage && (
                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded-xl border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{downloadSuccessMessage}</span>
                </div>
              )}

              {/* Download Option 1: Full Bible (66 Books, 1,189 Chapters) */}
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-[#E0D7C6] dark:border-zinc-800 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-2 text-xs sm:text-sm">
                    <Layers className="w-4 h-4 text-amber-600" />
                    Descargar Biblia COMPLETA (66 Libros)
                  </h4>
                  <span className="text-[10px] bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono px-2 py-0.5 rounded border border-amber-500/20 font-bold">
                    1,189 Capítulos
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
                  Descarga todos los libros desde Génesis hasta Apocalipsis en la memoria interna de tu dispositivo para tener la Biblia completa y sus versiones (RVR1960, NVI, LBLA, NTV) 100% offline.
                </p>

                {downloadMode === 'full' ? (
                  <div className="space-y-2.5 pt-1 bg-amber-50/50 dark:bg-zinc-800/50 p-3 rounded-xl border border-amber-200/60 dark:border-zinc-700">
                    <div className="flex justify-between items-center text-[11px] font-bold text-stone-800 dark:text-stone-200">
                      <span>Libro: <strong className="text-amber-700 dark:text-amber-400">{fullProgress?.currentBookName || 'Iniciando...'}</strong></span>
                      <span className="font-mono">{fullProgress?.completedChapters || 0} / {TOTAL_BIBLE_CHAPTERS} ({fullPercent}%)</span>
                    </div>
                    <div className="w-full h-3 bg-stone-200 dark:bg-zinc-700 rounded-full overflow-hidden shadow-inner">
                      <div
                        className="h-full bg-amber-600 transition-all duration-300"
                        style={{ width: `${fullPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center pt-1">
                      <span className="text-[10px] text-stone-500 dark:text-stone-400 italic">
                        Descargando capítulos en segundo plano...
                      </span>
                      <button
                        onClick={handleStopDownload}
                        className="px-2.5 py-1 rounded bg-stone-200 dark:bg-zinc-700 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-bold text-[10px] flex items-center gap-1 cursor-pointer"
                      >
                        <PauseCircle className="w-3 h-3 text-red-500" />
                        Pausar
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleStartFullBibleDownload}
                    disabled={!isOnline || isFullBibleComplete}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#7F1D1D] hover:bg-red-800 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-amber-200" />
                    <span>
                      {isFullBibleComplete
                        ? '✅ Biblia Completa Ya Guardada'
                        : isOnline
                        ? 'Descargar Biblia Completa Offline Ahora (66 Libros)'
                        : 'Requiere Conexión para Descargar'}
                    </span>
                  </button>
                )}
              </div>

              {/* Download Option 2: Quick Key Chapters */}
              <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl border border-[#E0D7C6] dark:border-zinc-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-stone-900 dark:text-white flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Descarga Rápida de Pasajes Clave (26 Capítulos)
                  </h4>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400">
                  Descarga instantánea de pasajes esenciales (Génesis 1, Salmo 23, Isaías 53, Mateo 5, Juan 3, Romanos 8, Hebreos 11, Apocalipsis 21).
                </p>

                {downloadMode === 'key' ? (
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-[11px] font-bold text-stone-700 dark:text-stone-300">
                      <span>Descargando: {keyProgress.name}</span>
                      <span>{keyProgress.current} / {keyProgress.total}</span>
                    </div>
                    <div className="w-full h-2 bg-stone-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 transition-all duration-200"
                        style={{ width: `${(keyProgress.current / keyProgress.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={handleStartKeyDownload}
                    disabled={!isOnline || downloadMode !== 'idle'}
                    className="w-full py-2 px-3 rounded-xl bg-stone-100 dark:bg-zinc-800 hover:bg-stone-200 dark:hover:bg-zinc-700 text-stone-800 dark:text-stone-200 font-bold text-xs flex items-center justify-center gap-2 transition-all border border-stone-200 dark:border-zinc-700 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Descargar 26 Capítulos Clave Rápidos</span>
                  </button>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-3 bg-[#FAF9F6] dark:bg-zinc-900 border-t border-[#E0D7C6] dark:border-zinc-800 flex justify-between items-center text-xs">
              <span className="text-stone-500 text-[11px]">
                IndexedDB & Cache Web Service Worker activo
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-stone-200 dark:bg-zinc-800 hover:bg-stone-300 text-stone-800 dark:text-stone-200 font-bold transition-colors text-xs cursor-pointer"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
