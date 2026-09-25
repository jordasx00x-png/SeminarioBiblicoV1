import React from 'react';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-6 max-w-sm">
        <div className="w-20 h-20 bg-[#7F1D1D] rounded-2xl flex items-center justify-center shadow-xl shadow-[#7F1D1D]/20">
          <span className="text-3xl text-white font-bold">📖</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1A2533] font-sans tracking-tight mb-2">
            Seminario Teológico Digital
          </h1>
          <p className="text-sm text-gray-600 font-serif">
            Cargando lecciones y materiales de estudio...
          </p>
        </div>
        <div className="w-8 h-8 border-3 border-[#E0D7C6] border-t-[#7F1D1D] rounded-full animate-spin mt-2" />
      </div>
    </div>
  );
}
