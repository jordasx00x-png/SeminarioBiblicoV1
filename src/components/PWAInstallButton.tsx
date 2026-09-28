import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, X, Smartphone } from 'lucide-react';

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
        className="flex items-center gap-2 rounded-full bg-[#1D2533] px-4 py-2 text-xs font-bold text-white shadow-lg hover:bg-black transition-all active:scale-95"
      >
        <Download size={14} />
        Instalar Aplicación
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-full border border-[#DEE2E6] bg-white px-4 py-2 text-xs font-bold text-[#1D2533] shadow-sm hover:bg-gray-50 transition-all active:scale-95"
        >
          <Smartphone size={14} />
          Instalar en iOS
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-[#1D2533]">Instalar en tu iPhone</h3>
                <button onClick={() => setShowIOSGuide(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4 text-sm text-gray-600">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                  <p>Pulsa el botón <strong>Compartir</strong> en la barra inferior de Safari.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                  <p>Desliza hacia abajo y pulsa en <strong>Añadir a pantalla de inicio</strong>.</p>
                </div>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-6 w-full rounded-xl bg-[#1D2533] py-3 text-sm font-bold text-white hover:bg-black transition-colors"
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
