'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  id: number;
  char: string;
  x: number;      // horizontal start position (0-100%)
  size: number;   // font size in px
  duration: number; // flight time in seconds
  delay: number;  // animation delay in seconds
  color: string;  // color class for text styling
}

// Configurable her-name and birth-date placeholders:
// - HER NAME: Melvina Igboanugo
// - BIRTHDATE: July 9th

export default function FloatingHearts({ active = false }: { active?: boolean }) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const idCounter = useRef(0);

  useEffect(() => {
    if (!active) {
      setParticles([]);
      return;
    }

    const items = ['❤️', '💖', '🎈', '✨', '🌸', '💛'];
    const colors = [
      'text-pink-400',
      'text-rose-400',
      'text-purple-400',
      'text-amber-400',
      'text-red-400',
      'text-indigo-400',
    ];

    // Helper to spawn a single particle
    const spawnParticle = (initialDelay = 0) => {
      const char = items[Math.floor(Math.random() * items.length)];
      const x = Math.random() * 90 + 5; // Keep away from exact edges
      const size = Math.random() * 24 + 16; // 16px to 40px
      const duration = Math.random() * 6 + 6; // 6s to 12s
      const color = colors[Math.floor(Math.random() * colors.length)];

      const newParticle: Particle = {
        id: idCounter.current++,
        char,
        x,
        size,
        duration,
        delay: initialDelay,
        color,
      };

      setParticles((prev) => [...prev.slice(-40), newParticle]); // Cap at 40 max particles to prevent lag
    };

    // Spawn 12 particles instantly at start
    for (let i = 0; i < 12; i++) {
      spawnParticle(Math.random() * 2);
    }

    // Spawn another particle every 1.2 seconds
    const interval = setInterval(() => {
      spawnParticle(0);
    }, 1200);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ y: '105vh', x: `${p.x}vw`, opacity: 0, scale: 0.5, rotate: 0 }}
            animate={{
              y: '-10vh',
              opacity: [0, 0.8, 0.8, 0], // Fade in quickly, hold, then fade out at top
              scale: [0.5, 1, 1, 0.7],
              rotate: Math.random() > 0.5 ? 360 : -360,
              x: [
                `${p.x}vw`,
                `${p.x + (Math.random() * 10 - 5)}vw`, // Wobble slightly to side
                `${p.x + (Math.random() * 20 - 10)}vw`,
              ],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              ease: 'easeInOut',
            }}
            style={{
              position: 'absolute',
              fontSize: `${p.size}px`,
            }}
            className={`select-none drop-shadow-md ${p.color}`}
          >
            {p.char}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
