'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowDown, Sparkles } from 'lucide-react';
import dynamic from 'next/dynamic';
import Envelope from '@/components/Envelope';
import Invitation from '@/components/Invitation';
import MusicPlayer from '@/components/MusicPlayer';
import LoadingScreen from '@/components/LoadingScreen';
import Countdown from '@/components/Countdown';
import { INVITATION_INFO } from '@/data/invitation';

const GalaxyBackground = dynamic(() => import('@/components/GalaxyBackground'), {
  ssr: false,
});

export default function Homepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [opened, setOpened] = useState(false);

  function openInvitation() {
    setOpened(true);

    confetti({
      particleCount: 120,
      spread: 80,
      startVelocity: 35,
      gravity: 0.85,
      origin: { y: 0.55 },
      colors: ['#d8ad70', '#f2d7a8', '#fff4dc', '#986a37', '#e8c28b'],
      scalar: 1,
    });

    window.setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: ['#d8ad70', '#f2d7a8', '#ffffff'],
      });
    }, 220);

    window.setTimeout(() => {
      confetti({
        particleCount: 65,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: ['#d8ad70', '#f2d7a8', '#ffffff'],
      });
    }, 380);
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <main className="grain cinematic-bg relative min-h-screen overflow-x-hidden selection:bg-[#d8ad70] selection:text-[#120e09]">
        <GalaxyBackground />

        <header className="relative z-20 flex items-center justify-between px-4 py-4 sm:px-8 sm:py-6">
          <a
            href="#top"
            className="group flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-[#d8ad70] sm:text-xs"
          >
            <Sparkles size={14} className="text-[#f2d7a8] transition-transform group-hover:rotate-45" />
            <span>Graduation · {INVITATION_INFO.name}</span>
          </a>

          <MusicPlayer />
        </header>

        <div id="top" className="relative z-10">
          <AnimatePresence mode="wait">
            {!opened ? (
              <Envelope key="envelope" onOpen={openInvitation} />
            ) : (
              <Invitation key="invitation" />
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {opened && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="relative z-10"
            >
              <Countdown />
              <section className="relative mx-auto max-w-2xl px-5 pb-24 pt-4 text-center">
                <Sparkles size={22} className="mx-auto mb-4 text-[#d8ad70]" />
                <p className="font-display gold-text text-4xl italic sm:text-6xl">
                  Thank You!
                </p>
                <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-white/60 sm:text-sm">
                  Cảm ơn bạn đã luôn là một phần ý nghĩa trong hành trình thanh xuân và học tập của mình.
                </p>
                <button
                  onClick={() => document.getElementById('top')?.scrollIntoView({ behavior: 'smooth' })}
                  className="gold-button mt-7 inline-flex items-center gap-2 rounded-full px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em]"
                >
                  Trở về đầu trang <ArrowDown size={14} className="rotate-180" />
                </button>
              </section>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="relative z-10 border-t border-white/5 px-2 py-5 text-center text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.25em] text-white/30 whitespace-nowrap overflow-hidden text-ellipsis">
          A new chapter begins · Class of 2026 · {INVITATION_INFO.name}
        </footer>
      </main>
    </>
  );
}
