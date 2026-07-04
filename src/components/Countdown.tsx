'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

// Configurable placeholders:
// - BIRTHDAY DATE: July 9th (Month 6 in JavaScript: Jan=0, Jul=6)
const BIRTHDAY_MONTH = 6; // July (0-indexed)
const BIRTHDAY_DAY = 9;

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isBirthday: boolean;
    isPast: boolean;
  }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isBirthday: false,
    isPast: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      
      // Target: July 9th of the current year, at midnight (00:00:00)
      let targetDate = new Date(currentYear, BIRTHDAY_MONTH, BIRTHDAY_DAY, 0, 0, 0);
      
      const difference = targetDate.getTime() - now.getTime();
      const isToday = now.getMonth() === BIRTHDAY_MONTH && now.getDate() === BIRTHDAY_DAY;
      const isAfter = now.getTime() > targetDate.getTime() && !isToday;

      let days = 0;
      let hours = 0;
      let minutes = 0;
      let seconds = 0;

      if (difference > 0) {
        days = Math.floor(difference / (1000 * 60 * 60 * 24));
        hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        minutes = Math.floor((difference / 1000 / 60) % 60);
        seconds = Math.floor((difference / 1000) % 60);
      }

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isBirthday: isToday,
        isPast: isAfter,
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="py-12 flex justify-center items-center">
        <div className="animate-spin w-8 h-8 border-4 border-pink-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  const { days, hours, minutes, seconds, isBirthday, isPast } = timeLeft;

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring' as const, stiffness: 100 } },
  };

  return (
    <section className="py-16 px-4 relative flex flex-col items-center justify-center">
      {/* Ambient backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-lg mx-auto text-center space-y-8 relative z-10">
        
        {/* Header */}
        <div>
          {isBirthday ? (
            <motion.h2
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300 flex items-center justify-center gap-2"
            >
              <Gift className="w-6 h-6 text-pink-400 animate-bounce" />
              <span>Today is the celebration day 🎂</span>
            </motion.h2>
          ) : isPast ? (
            <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-300">
              The celebration continues 🎉
            </h2>
          ) : (
            <h2 className="text-lg sm:text-xl font-bold text-pink-200/80 tracking-wide">
              Countdown to Her Special Day
            </h2>
          )}
        </div>

        {/* Timer Grid (only show if birthday has not arrived yet) */}
        {!isBirthday && !isPast && (
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm sm:max-w-md mx-auto">
            {/* Days */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-lg hover:border-pink-500/30 transition-all duration-300"
            >
              <span className="text-xl sm:text-3xl font-extrabold text-white">{days}</span>
              <span className="text-[10px] sm:text-xs text-purple-300 font-medium uppercase tracking-wider mt-1">Days</span>
            </motion.div>

            {/* Hours */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-lg hover:border-pink-500/30 transition-all duration-300"
            >
              <span className="text-xl sm:text-3xl font-extrabold text-white">
                {hours.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-purple-300 font-medium uppercase tracking-wider mt-1">Hours</span>
            </motion.div>

            {/* Minutes */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-lg hover:border-pink-500/30 transition-all duration-300"
            >
              <span className="text-xl sm:text-3xl font-extrabold text-white">
                {minutes.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-purple-300 font-medium uppercase tracking-wider mt-1">Mins</span>
            </motion.div>

            {/* Seconds */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-3 sm:p-5 flex flex-col items-center justify-center shadow-lg hover:border-pink-500/30 transition-all duration-300"
            >
              <span className="text-xl sm:text-3xl font-extrabold text-pink-400">
                {seconds.toString().padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-purple-300 font-medium uppercase tracking-wider mt-1">Secs</span>
            </motion.div>
          </div>
        )}

        {/* Message for Today / Past */}
        {(isBirthday || isPast) && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 80 }}
            className="p-6 bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-lg border border-pink-500/20 rounded-2xl shadow-xl max-w-sm mx-auto"
          >
            <p className="text-sm text-pink-100 font-medium leading-relaxed">
              {isBirthday 
                ? "Let's pour all the love, prayers, and wishes onto her walls! Make today an unforgettable one for Melvina! 💖"
                : "The celebration continues! You can still write your beautiful wishes, prayers, and blessings down below."}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
