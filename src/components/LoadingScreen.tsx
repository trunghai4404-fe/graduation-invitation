'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';
import { INVITATION_INFO } from '@/data/invitation';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400;

    const interval = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const nextProgress = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(nextProgress);

      if (nextProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 250);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04, filter: 'blur(12px)' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#05070e] text-center px-4 select-none"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,rgba(216,173,112,0.15),transparent_65%)]"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <div className="relative size-28 sm:size-32 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-2 rounded-full border border-dashed border-[#d8ad70]/30"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-[#f2d7a8] border-r-[#d8ad70]/40"
          />

          <motion.div
            animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -inset-3 rounded-full bg-[#d8ad70]/20 blur-xl pointer-events-none"
          />

          <div className="relative grid size-20 sm:size-24 place-items-center rounded-full border border-[#f2d7a8]/60 bg-gradient-to-br from-[#2a2016] via-[#16141a] to-[#0a0a0e] shadow-[0_0_35px_rgba(216,173,112,0.35)]">
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#f2d7a8]"
            >
              <GraduationCap size={36} strokeWidth={1.3} className="sm:size-10" />
            </motion.div>
          </div>

          <motion.div
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -right-1 -top-1 text-[#f2d7a8]"
          >
            <Sparkles size={18} />
          </motion.div>
        </div>

        <p className="mt-8 text-[9px] uppercase tracking-[0.4em] text-[#d8ad70] sm:text-[10px]">
          Class of 2026
        </p>

        <h2 className="font-display gold-text mt-1 text-2xl sm:text-3xl italic tracking-wide">
          {INVITATION_INFO.name}
        </h2>

        <div className="mt-6 w-44 sm:w-56">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#b88647] via-[#f2d7a8] to-[#d8ad70]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-white/45">
            <span>Đang tải...</span>
            <span className="font-medium text-[#f2d7a8]">{progress}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
