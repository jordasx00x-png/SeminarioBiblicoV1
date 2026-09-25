import React from 'react';

export function WelcomePage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex flex-col items-center gap-6 max-w-sm">
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
