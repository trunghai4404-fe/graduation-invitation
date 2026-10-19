'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  ArrowUpRight,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { INVITATION_INFO } from '@/data/invitation';

export default function Invitation() {
  const details = [
    {
      icon: CalendarDays,
      label: 'Ngày tổ chức',
      title: INVITATION_INFO.date,
      sub: null,
    },
    {
      icon: Clock3,
      label: 'Thời gian',
      title: INVITATION_INFO.time,
    },
    {
      icon: MapPin,
      label: 'Địa điểm',
      title: `${INVITATION_INFO.university} (${INVITATION_INFO.campus})`,
    },
    {
      icon: Phone,
      label: 'Số điện thoại',
      title: INVITATION_INFO.phone,
      isPhone: true,
    },
  ];

  return (
    <motion.section
      key="invitation"
      initial={{ opacity: 0, y: 35, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.85, ease: 'easeOut' }}
      className="relative z-10 mx-auto w-full max-w-4xl px-3 py-4 sm:px-6 sm:py-8 md:py-10"
    >
      <div className="relative overflow-hidden rounded-xl border border-[#c79c61]/50 bg-[#0d0e14]/92 p-2 sm:p-3 shadow-[0_30px_100px_rgba(0,0,0,0.85)] backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,173,112,0.18),transparent_60%)]" />

        <div className="relative rounded-lg border border-[#c79c61]/30 bg-gradient-to-b from-[#14141c]/90 via-[#0e0f14]/90 to-[#0a0a0e]/95 px-4 py-6 sm:px-8 sm:py-8 md:px-12">
          <div className="pointer-events-none absolute left-3 top-3 size-4 border-l-2 border-t-2 border-[#d8ad70]/60 sm:left-4 sm:top-4 sm:size-5" />
          <div className="pointer-events-none absolute right-3 top-3 size-4 border-r-2 border-t-2 border-[#d8ad70]/60 sm:right-4 sm:top-4 sm:size-5" />
          <div className="pointer-events-none absolute bottom-3 left-3 size-4 border-b-2 border-l-2 border-[#d8ad70]/60 sm:bottom-4 sm:left-4 sm:size-5" />
          <div className="pointer-events-none absolute bottom-3 right-3 size-4 border-b-2 border-r-2 border-[#d8ad70]/60 sm:bottom-4 sm:right-4 sm:size-5" />

          <div className="relative border-b border-white/10 pb-6 sm:pb-8">
            <div className="grid grid-cols-12 gap-3 sm:gap-6 items-center">
              <motion.div
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="col-span-7 sm:col-span-7 md:col-span-8 text-left"
              >
                <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-[#d8ad70]/50 bg-[#d8ad70]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[#d8ad70] shadow-[0_0_15px_rgba(216,173,112,0.2)]">
                  <GraduationCap size={15} strokeWidth={1.4} />
                  <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.25em] font-semibold text-[#f2d7a8]">
                    Class of 2026
                  </span>
                </div>

                <p className="mt-2 text-[9px] uppercase tracking-[0.35em] text-[#d8ad70] sm:text-xs">
                  A New Chapter Begins
                </p>

                <h2 className="font-display gold-text mt-1 text-3xl italic leading-none sm:text-5xl md:text-6xl">
                  Graduation
                </h2>
                <p className="mt-0.5 text-[9px] uppercase tracking-[0.3em] text-white/50 sm:text-xs">
                  Invitation
                </p>

                <div className="my-3 sm:my-4 flex items-center gap-2">
                  <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-[#d8ad70]/80 to-transparent" />
                  <Sparkles size={11} className="text-[#d8ad70]" />
                </div>

                <p className="text-[11px] text-white/60 sm:text-xs">
                  Trân trọng kính mời bạn đến chung vui cùng
                </p>

                <div className="mt-1 flex flex-wrap items-baseline gap-2 sm:gap-3">
                  <h3 className="font-display gold-text text-2xl font-medium sm:text-4xl md:text-5xl tracking-wide py-1">
                    {INVITATION_INFO.name}
                  </h3>
                  <span className="rounded-full border border-[#d8ad70]/60 bg-[#251e15] px-2 py-0.5 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#f2d7a8]">
                    {INVITATION_INFO.role}
                  </span>
                </div>

                <p className="mt-2 max-w-lg text-[11px] leading-relaxed text-white/65 sm:text-xs sm:leading-6 hidden sm:block">
                  {INVITATION_INFO.message}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92, x: 15 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.7 }}
                className="col-span-5 sm:col-span-5 md:col-span-4 relative flex items-end justify-center self-end"
              >
                <div className="relative w-full h-[220px] sm:h-[290px] md:h-[350px] flex items-end justify-center group overflow-hidden">
                  <div
                    className="absolute inset-0 m-auto size-32 sm:size-48 rounded-full bg-gradient-to-br from-[#d8ad70]/30 via-[#a06a32]/20 to-transparent blur-2xl pointer-events-none"
                    aria-hidden="true"
                  />

                  <div className="absolute inset-x-1 sm:inset-x-3 top-2 bottom-0 rounded-t-full border border-[#d8ad70]/35 bg-gradient-to-b from-[#251d16]/35 via-[#15141b]/20 to-transparent pointer-events-none transition-colors group-hover:border-[#d8ad70]/65" />

                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={INVITATION_INFO.photoUrl}
                      alt={INVITATION_INFO.name}
                      fill
                      priority
                      sizes="(max-width: 640px) 180px, (max-width: 768px) 260px, 340px"
                      className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.85)] scale-[1.25] sm:scale-[1.3] md:scale-[1.35] origin-bottom transition-all duration-500 group-hover:scale-[1.32] sm:group-hover:scale-[1.38] md:group-hover:scale-[1.42] group-hover:brightness-105"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 sm:h-10 bg-gradient-to-t from-[#0e0f14] via-[#0e0f14]/80 to-transparent z-10" />
                  </div>
                </div>
              </motion.div>
            </div>

            <p className="mt-3 text-left text-[11px] leading-relaxed text-white/65 sm:hidden">
              {INVITATION_INFO.message}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto my-6 grid max-w-2xl gap-3 sm:gap-5 text-left sm:grid-cols-2"
          >
            {details.map(({ icon: Icon, label, title, isPhone }, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.08 }}
                className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 sm:p-3.5 transition-colors hover:border-[#d8ad70]/30 hover:bg-white/[0.04]"
              >
                <div className="mt-0.5 grid size-8 sm:size-9 shrink-0 place-items-center rounded-lg border border-[#d8ad70]/40 bg-[#d8ad70]/10 text-[#d8ad70]">
                  <Icon size={17} strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#d8ad70]">
                    {label}
                  </p>
                  {isPhone ? (
                    <a
                      href={`tel:${title}`}
                      className="mt-1 inline-block text-xs sm:text-sm font-semibold text-white/95 underline-offset-4 hover:text-[#f2d7a8] hover:underline"
                    >
                      {title}
                    </a>
                  ) : (
                    <p className="mt-1 text-xs font-medium text-white/95 sm:text-sm leading-snug">
                      {title}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="my-4 text-center"
          >
            <p className="font-display text-xl sm:text-2xl md:text-3xl italic text-[#f2dfc0]">
              Your presence means the world to me.
            </p>
            <p className="mx-auto mt-1 max-w-md text-[11px] tracking-wide text-white/50 sm:text-xs">
              {INVITATION_INFO.subQuote}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4"
          >
            <a
              href={INVITATION_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-button inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 sm:px-6 sm:py-3 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] shadow-lg shadow-black/40"
            >
              <MapPin size={14} />
              Mở bản đồ
              <ArrowUpRight size={13} />
            </a>

            <a
              href={`tel:${INVITATION_INFO.phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 sm:px-6 sm:py-3 text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-sm transition-all hover:border-[#d8ad70]/50 hover:bg-white/10 hover:text-white"
            >
              <Phone size={14} className="text-[#d8ad70]" />
              Gọi {INVITATION_INFO.phone}
            </a>
          </motion.div>
        </div>
      </div>

      <p className="mt-4 text-center text-[8px] sm:text-[9px] uppercase tracking-[0.14em] sm:tracking-[0.3em] text-white/35 whitespace-nowrap overflow-hidden text-ellipsis px-2">
        HUTECH University · Class of 2026 · {INVITATION_INFO.name}
      </p>
    </motion.section>
  );
}
