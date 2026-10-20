'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { INVITATION_INFO } from '@/data/invitation';
import {
  calculateTimeLeft,
  isEventInFuture,
  pad,
  parseEventDate,
  type TimeLeft,
} from '@/lib/countdownHelpers';

interface DigitTileProps {
  value: string;
  label: string;
  index: number;
}

function DigitTile({ value, label, index }: DigitTileProps) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value !== prev) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrev(value);
        setFlipping(false);
      }, 320);
      return () => clearTimeout(t);
    }
  }, [value, prev]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.55, ease: 'easeOut' }}
      className="countdown-tile-wrapper"
    >
      <div className="countdown-tile">
        <div className="countdown-glow" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ opacity: 0, scale: 0.6, rotateX: -90 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.6, rotateX: 90 }}
            transition={{ duration: 0.32, ease: [0.34, 1.56, 0.64, 1] }}
            className="countdown-number"
            style={{ display: 'block' }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </div>

      <p className="countdown-label">{label}</p>
    </motion.div>
  );
}

export default function Countdown() {
  const eventDate = useRef(
    parseEventDate(INVITATION_INFO.date, INVITATION_INFO.time),
  );
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(eventDate.current),
  );
  const [hasPassed, setHasPassed] = useState(
    !isEventInFuture(eventDate.current),
  );

  useEffect(() => {
    const tick = () => {
      const t = calculateTimeLeft(eventDate.current);
      setTimeLeft(t);
      if (t.total <= 0) setHasPassed(true);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { value: String(timeLeft.days), label: 'Ngày' },
    { value: pad(timeLeft.hours), label: 'Giờ' },
    { value: pad(timeLeft.minutes), label: 'Phút' },
    { value: pad(timeLeft.seconds), label: 'Giây' },
  ];

  return (
    <section className="countdown-section">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="countdown-heading"
      >
        <span className="countdown-eyebrow">⏳ Đếm ngược đến ngày lễ</span>
        <h2 className="countdown-title">{INVITATION_INFO.date}</h2>
        <p className="countdown-subtitle">
          {INVITATION_INFO.time} · {INVITATION_INFO.university}
        </p>
      </motion.div>

      {hasPassed ? (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="countdown-passed"
        >
          🎓 Lễ tốt nghiệp đã diễn ra!
        </motion.p>
      ) : (
        <div className="countdown-tiles">
          {units.map((u, i) => (
            <DigitTile key={u.label} value={u.value} label={u.label} index={i} />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.7 }}
        className="countdown-sep"
      />
    </section>
  );
}
