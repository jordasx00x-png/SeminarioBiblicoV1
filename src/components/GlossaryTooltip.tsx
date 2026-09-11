import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GLOSSARY } from '../data/glossary';
import { Info } from 'lucide-react';

interface GlossaryTooltipProps {
  term: string;
  children: React.ReactNode;
  key?: string | number;
}

export function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [, setTooltipPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef<HTMLSpanElement>(null);
  const definition = GLOSSARY[term];

  if (!definition) return <>{children}</>;

  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.bottom + window.scrollY + 8,
        left: Math.min(Math.max(rect.left + window.scrollX, 20), window.innerWidth - 320)
      });
    }
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('scroll', updatePosition);
      window.addEventListener('resize', updatePosition);
    }
    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  return (
    <span 
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="cursor-help border-b-2 border-dotted border-[#D1B17F] hover:bg-[#FAF9F6] transition-colors rounded-t-sm px-0.5">
        {children}
      </span>
      
      <AnimatePresence>
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              marginTop: '8px',
              zIndex: 50,
            }}
            className="block w-72 bg-[#1A2533] text-white p-4 rounded-lg shadow-xl border border-[#D1B17F]/30 text-left font-normal not-italic"
          >
            <span className="flex items-start gap-3">
              <Info size={18} className="text-[#D1B17F] shrink-0 mt-0.5" />
              <span className="block">
                <span className="block font-bold text-[#D1B17F] text-sm uppercase tracking-wider mb-1">{term}</span>
                <span className="block text-xs leading-relaxed text-gray-200 font-sans">
                  {definition}
                </span>
              </span>
            </span>
            <span className="absolute -top-1.5 left-4 w-3 h-3 bg-[#1A2533] border-t border-l border-[#D1B17F]/30 rotate-45 block" />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
