'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Sparkles } from 'lucide-react';
import { INVITATION_INFO } from '@/data/invitation';

type Props = { onOpen: () => void };

export default function Envelope({ onOpen }: Props) {
  const [phase, setPhase] = useState<'idle' | 'opening'>('idle');

  const handleOpen = () => {
    if (phase !== 'idle') return;
    setPhase('opening');
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('start-graduation-music'));
    }
    setTimeout(() => onOpen(), 2300);
  };

  return (
    <motion.section
      key="envelope"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={
        phase === 'opening'
          ? { opacity: 0, transition: { duration: 0.2 } }
          : { opacity: 0, scale: 0.9, filter: 'blur(10px)', transition: { duration: 0.6 } }
      }
      transition={{ duration: 0.7 }}
      className="relative z-10 mx-auto flex min-h-[calc(100svh-110px)] w-full max-w-4xl flex-col items-center justify-center px-4 py-8 text-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0], rotate: [0, -2, 2, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-4 text-[#d9b47c]"
      >
        <GraduationCap size={38} strokeWidth={1.2} />
      </motion.div>

      <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-[#d4b17b] sm:text-xs">
        {INVITATION_INFO.quote}
      </p>
      <h1 className="font-display gold-text text-5xl italic leading-tight sm:text-7xl px-2 sm:px-4">
        You are invited
      </h1>
      <p className="mt-3 text-[10px] uppercase tracking-[0.3em] text-white/50 sm:text-xs">
        Lễ Tốt Nghiệp · {INVITATION_INFO.name}
      </p>

      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleOpen();
          }
        }}
        aria-label="Nhấn để mở phong bì thiệp mời tốt nghiệp"
        className="group relative mt-9 w-full max-w-[390px] cursor-pointer select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#e2bc81]"
      >
        {/* ── Letter card – rises from within the envelope ── */}
        {phase === 'opening' && (
          <motion.div
            initial={{ y: '0%', opacity: 0, scale: 0.95 }}
            animate={{
              y: ['0%', '-78%', '-78%', '-220%'],
              opacity: [0, 1, 1, 0],
              scale: [0.95, 1, 1, 2.5],
            }}
            transition={{
              duration: 2.5,
              times: [0, 0.32, 0.65, 1],
              ease: 'easeOut',
            }}
            className="pointer-events-none absolute inset-x-3 bottom-0 z-10 flex flex-col items-center justify-center gap-2 rounded-xl border border-[#c8903e]/45"
            style={{
              height: '100%',
              background: 'linear-gradient(160deg, #fdf6e8 0%, #f4e2b8 50%, #e0b96a 100%)',
              boxShadow:
                '0 -30px 80px rgba(216,173,112,0.55), 0 20px 50px rgba(0,0,0,0.85)',
            }}
          >
            <Sparkles size={20} className="text-[#9a6b28]" />
            <p className="font-display text-xl italic text-[#4e3010]">
              Lễ Tốt Nghiệp
            </p>
            <div
              style={{
                height: '1px',
                width: '40px',
                background: 'linear-gradient(90deg, transparent, #c8903e, transparent)',
              }}
            />
            <p className="text-[8px] uppercase tracking-[0.28em] text-[#7a5028]/90">
              {INVITATION_INFO.name}
            </p>
            <p className="text-[7px] uppercase tracking-[0.2em] text-[#9a7040]/70">
              Class of 2026
            </p>
          </motion.div>
        )}

        {/* ── Envelope card ── */}
        <motion.div
          whileHover={phase === 'idle' ? { scale: 1.03, y: -4 } : {}}
          whileTap={phase === 'idle' ? { scale: 0.98 } : {}}
          animate={phase === 'opening' ? { scale: 0.97, y: 5 } : {}}
          transition={
            phase === 'opening'
              ? { duration: 0.4, ease: 'easeIn' }
              : { type: 'spring', stiffness: 350, damping: 22 }
          }
          className="envelope-glow-interactive relative z-20 aspect-[1.58/1] overflow-hidden rounded-sm border border-[#c69a5a]/85 bg-linear-to-br from-[#2a221a] via-[#161519] to-[#0a0a0c]"
        >
          <div className="absolute inset-3 border border-[#b58a50]/30 transition-all duration-500 group-hover:border-[#e3bd7d]/60" />

          {/* Envelope flap – fades up when opening */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[68%] origin-top bg-linear-to-b from-[#4e3925] via-[#332418] to-[#1c1817] [clip-path:polygon(0_0,100%_0,50%_100%)] duration-500 group-hover:brightness-125"
            animate={phase === 'opening' ? { opacity: 0, y: '-14%' } : {}}
            transition={{ duration: 0.38, ease: 'easeIn' }}
          />

          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

          <div className="absolute inset-0 [clip-path:polygon(0_100%,50%_42%,100%_100%)] bg-linear-to-br from-[#2c221a] via-[#161416] to-[#342215]" />
          <div className="absolute inset-0 [clip-path:polygon(0_0,50%_55%,0_100%)] bg-linear-to-r from-[#312519] to-[#171416]" />
          <div className="absolute inset-0 [clip-path:polygon(100%_0,50%_55%,100%_100%)] bg-linear-to-l from-[#312519] to-[#171416]" />

          <div className="absolute left-1/2 top-[53%] z-10 -translate-x-1/2 -translate-y-1/2">
            <span className="absolute -inset-2.5 rounded-full border border-[#f2d7a8]/70 animate-ping opacity-75" />
            <span className="absolute -inset-1 rounded-full bg-[#d8ad70]/30 blur-sm animate-pulse" />
            <div className="relative grid size-14 sm:size-16 place-items-center rounded-full border-2 border-[#f2d7a8] bg-linear-to-br from-[#f2d7a8] via-[#a8743c] to-[#3f2713] shadow-[0_0_35px_rgba(218,165,91,0.45)] transition-transform duration-300 group-hover:scale-110">
              <GraduationCap size={24} className="text-[#1a1209] sm:size-[26px]" strokeWidth={1.4} />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-4 z-10 text-center text-[9px] uppercase tracking-[0.4em] text-[#e6c18a]/80 font-medium">
            Class of 2026
          </div>

          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(240,192,120,0.22),transparent_55%)]" />
        </motion.div>

        <motion.div
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.95, 1.15, 0.95] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="absolute -right-3 -top-3 text-[#f0c982] pointer-events-none"
        >
          <Sparkles size={24} />
        </motion.div>
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 3.2, delay: 0.5, repeat: Infinity }}
          className="absolute -left-3 -bottom-3 text-[#d8ad70] pointer-events-none"
        >
          <Sparkles size={20} />
        </motion.div>
      </div>

      <p className="mt-8 font-display text-lg italic text-white/45 sm:text-xl">
        A new chapter begins.
      </p>
      <div className="mt-6 h-8 w-px bg-linear-to-b from-[#cba66e]/70 to-transparent" />
    </motion.section>
  );
}
