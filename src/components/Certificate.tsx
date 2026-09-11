import React from 'react';
import { Course } from '../types';
import { User } from 'firebase/auth';
import { Award, Download, X } from 'lucide-react';

interface CertificateProps {
  course: Course;
  user: User;
  customProfile?: {fullName?: string; email?: string; phoneNumber?: string};
  onClose: () => void;
}

export function Certificate({ course, user, customProfile, onClose }: CertificateProps) {
  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" style={{ zIndex: 100 }}>
      <div className="bg-[#FAF9F6] relative max-w-4xl w-full p-8 md:p-16 border-8 border-double border-[#BDB2A0] shadow-2xl rounded-sm flex flex-col items-center text-center">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-[#BDB2A0] hover:text-[#1A2533] transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-[#BDB2A0] mb-6 border-b-2 border-t-2 border-[#1A2533] py-2">
          <Award size={64} className="text-[#7F1D1D]" />
        </div>

        <h1 className="text-3xl md:text-5xl font-serif text-[#1A2533] font-bold tracking-widest uppercase mb-4 px-4 text-center">
          Certificado de Finalización
        </h1>

        <p className="text-gray-500 font-sans tracking-widest uppercase text-xs md:text-sm mt-4 mb-8">
          Otorgado orgullosamente a
        </p>

        <h2 className="text-3xl md:text-5xl text-[#7F1D1D] mb-8 font-serif italic border-b border-[#BDB2A0] pb-2 inline-block px-12">
          {customProfile?.fullName || user?.displayName || 'Estudiante'}
        </h2>

        <p className="text-gray-600 font-serif text-lg md:text-xl max-w-2xl leading-relaxed mb-16">
          Por haber completado satisfactoriamente el programa de 90 días del módulo 
          <span className="font-bold text-[#1A2533] uppercase block mt-2 text-xl"> {course.title}</span> 
          <br/>demostrando dedicación, estudio profundo y compromiso constante.
        </p>

        <div className="flex justify-between w-full max-w-2xl px-4 mt-4 font-sans text-xs md:text-sm font-bold text-gray-500 tracking-wider">
          <div className="flex flex-col items-center">
            <span className="border-t border-[#1A2533] w-32 pt-2 mb-1 text-center">Fecha de Emisión</span>
            <span>{currentDate}</span>
          </div>
          
          <div className="flex flex-col items-center">
            <span className="border-t border-[#1A2533] w-32 pt-2 mb-1 text-center">Firma Autorizada</span>
            <span className="font-serif italic text-lg -mt-1 text-[#1A2533]">Seminario Bíblico</span>
          </div>
        </div>

        <button 
          className="mt-16 flex items-center gap-2 bg-[#1A2533] text-white px-8 py-3 rounded text-xs md:text-sm font-bold tracking-widest uppercase hover:bg-black shadow-md hover:shadow-lg transition-all"
          onClick={() => window.print()}
        >
          <Download size={18} />
          Imprimir Certificado
        </button>
      </div>
    </div>
  );
}
