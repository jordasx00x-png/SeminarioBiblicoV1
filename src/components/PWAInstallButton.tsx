import React, { useState } from 'react';
import { Download, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="w-full flex items-center justify-between gap-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-2 text-xs font-bold text-amber-200 shadow-sm transition-all cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <Download className="w-4 h-4 text-amber-400" />
          <span>Instalar App Offline</span>
        </div>
        <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 font-mono">PWA</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="w-full flex items-center justify-between gap-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 px-3 py-2 text-xs font-bold text-amber-200 transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-amber-400" />
            <span>Instalar en iPhone / iPad</span>
          </div>
          <span className="text-[10px] bg-amber-500/20 px-1.5 py-0.5 rounded text-amber-300 font-mono">iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 font-sans">
            <div className="w-full max-w-sm rounded-2xl bg-[#FAF9F6] dark:bg-zinc-900 border border-[#E0D7C6] dark:border-zinc-700 p-5 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E0D7C6] dark:border-zinc-800 pb-3">
                <h3 className="text-base font-bold text-stone-900 dark:text-white flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-amber-600" />
                  Instalar en iPhone / iPad
                </h3>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-3 text-xs text-stone-600 dark:text-stone-300 space-y-2.5 leading-relaxed">
                <p>Para usar la Biblia y los Estudios sin internet en tu iPhone/iPad:</p>
                <div className="bg-amber-50 dark:bg-zinc-800 p-3 rounded-xl border border-amber-200 dark:border-zinc-700 space-y-1.5">
                  <p><strong>1.</strong> Toca el botón <strong>Compartir</strong> <span className="text-blue-600 font-bold">⎋</span> en la barra de Safari.</p>
                  <p><strong>2.</strong> Desplázate hacia abajo y toca <strong>"Agregar a inicio"</strong> ➕.</p>
                  <p><strong>3.</strong> Confirma tocando <strong>"Agregar"</strong>.</p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-4 w-full rounded-xl bg-[#1A2533] text-white py-2 text-xs font-bold hover:bg-[#2C3E50] transition"
              >
                Entendido
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
