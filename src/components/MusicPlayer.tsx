'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';

declare global {
  interface Window {
    __graduationAudio?: HTMLAudioElement | null;
    __startGraduationMusic?: () => Promise<boolean>;
  }
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.7;
    window.__graduationAudio = audio;

    const tryPlay = async (): Promise<boolean> => {
      try {
        await audio.play();
        setPlaying(true);
        return true;
      } catch {
        setPlaying(false);
        return false;
      }
    };

    window.__startGraduationMusic = tryPlay;

    const events = ['pointerdown', 'touchstart', 'mousedown', 'keydown', 'click'];
    const unlockAndPlay = async () => {
      const ok = await tryPlay();
      if (ok) {
        events.forEach((ev) => {
          window.removeEventListener(ev, unlockAndPlay, true);
          document.removeEventListener(ev, unlockAndPlay, true);
        });
      }
    };

    events.forEach((ev) => {
      window.addEventListener(ev, unlockAndPlay, { capture: true, passive: true });
      document.addEventListener(ev, unlockAndPlay, { capture: true, passive: true });
    });

    const handleExternalPlay = () => {
      tryPlay();
    };
    window.addEventListener('start-graduation-music', handleExternalPlay);

    tryPlay();

    return () => {
      window.removeEventListener('start-graduation-music', handleExternalPlay);
      events.forEach((ev) => {
        window.removeEventListener(ev, unlockAndPlay, true);
        document.removeEventListener(ev, unlockAndPlay, true);
      });
      delete window.__startGraduationMusic;
      delete window.__graduationAudio;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
  }, [muted]);

  async function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  return (
    <div className="relative group">
      <div
        className={`absolute -inset-[2px] rounded-full overflow-hidden pointer-events-none transition-opacity duration-500 ${
          playing ? 'opacity-100' : 'opacity-35 group-hover:opacity-75'
        }`}
        aria-hidden="true"
      >
        <div
          className={`absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_70deg,#d8ad70_120deg,#fff2db_180deg,#c8934d_240deg,transparent_310deg)] ${
            playing ? 'animate-spin-orbit' : ''
          }`}
          style={{ animationDuration: '3.5s' }}
        />
      </div>

      {playing && (
        <div
          className="absolute -inset-1 rounded-full bg-[#d8ad70]/25 blur-md pointer-events-none animate-pulse-ring"
          aria-hidden="true"
        />
      )}

      <div
        className="relative z-10 flex items-center gap-1.5 sm:gap-2.5 rounded-full border border-white/10 bg-[#0d0e12]/90 px-2 py-1.5 sm:px-3 sm:py-2 backdrop-blur-xl shadow-lg shadow-black/60"
        aria-label="Điều khiển nhạc nền"
      >
        <audio
          ref={audioRef}
          src="/music/music.mp3"
          autoPlay
          loop
          playsInline
          preload="auto"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />

        <button
          onClick={togglePlay}
          aria-label={playing ? 'Tạm dừng nhạc' : 'Phát nhạc'}
          className="grid size-7 sm:size-8 place-items-center rounded-full bg-[#d8ad70]/15 text-[#f2d7a8] transition-all hover:scale-105 hover:bg-[#d8ad70] hover:text-[#120e09] active:scale-95"
        >
          {playing ? <Pause size={14} className="fill-current" /> : <Play size={14} className="ml-0.5 fill-current" />}
        </button>

        <div className="flex items-end gap-[3px] h-3.5 px-0.5 sm:px-1" aria-hidden="true">
          <span
            className={`w-[2.5px] rounded-full bg-[#d8ad70] transition-all duration-300 ${
              playing ? 'animate-[bounce_0.8s_infinite_ease-in-out]' : 'h-1.5 opacity-50'
            }`}
            style={{ height: playing ? '100%' : '6px', animationDelay: '0ms' }}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#f2d7a8] transition-all duration-300 ${
              playing ? 'animate-[bounce_0.6s_infinite_ease-in-out]' : 'h-2.5 opacity-50'
            }`}
            style={{ height: playing ? '100%' : '10px', animationDelay: '150ms' }}
          />
          <span
            className={`w-[2.5px] rounded-full bg-[#d8ad70] transition-all duration-300 ${
              playing ? 'animate-[bounce_0.9s_infinite_ease-in-out]' : 'h-1 opacity-50'
            }`}
            style={{ height: playing ? '100%' : '4px', animationDelay: '300ms' }}
          />
        </div>

        <span className="hidden sm:inline-block pr-1 text-[10px] font-medium tracking-[0.2em] uppercase text-white/70">
          Soundtrack
        </span>

        <button
          onClick={() => setMuted((v) => !v)}
          aria-label={muted ? 'Bật âm thanh' : 'Tắt âm thanh'}
          className="grid size-7 sm:size-8 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white active:scale-95"
        >
          {muted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
      </div>
    </div>
  );
}
