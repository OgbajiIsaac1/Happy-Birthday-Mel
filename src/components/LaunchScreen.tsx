'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Terminal, ShieldCheck, Heart } from 'lucide-react';

interface LaunchScreenProps {
  onLaunch: () => void;
}

// Configurable her-name and birth-date placeholders:
// - HER NAME: Melvina Igboanugo
// - BIRTHDATE: July 9

export default function LaunchScreen({ onLaunch }: LaunchScreenProps) {
  const [logs, setLogs] = useState<string[]>([]);
  const [showButton, setShowButton] = useState(false);

  const terminalMessages = [
    'Initializing Birthday System...',
    'Scanning calendar for high-priority dates...',
    'Target Found ✅',
    'Name: MELVINA IGBOANUGO',
    'Status: Amazing Friend & A True Blessing',
    'Birthday: July 9',
    'Celebration Mode: Ready!',
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < terminalMessages.length) {
        setLogs((prev) => [...prev, terminalMessages[index]]);
        index++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowButton(true), 600);
      }
    }, 500); // Print a line every 500ms

    return () => clearInterval(interval);
  }, []);

  const handleLaunch = () => {
    // Fire beautiful confetti
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FF69B4', '#FFD700', '#DA70D6', '#FF1493', '#FFFFFF'],
    });

    // Fire side bursts too for extra wow factor
    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FF69B4', '#FFD700', '#DA70D6'],
      });
    }, 200);

    setTimeout(() => {
      confetti({
        particleCount: 80,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#FF69B4', '#FFD700', '#DA70D6'],
      });
    }, 400);

    // Call launch handler to fade out
    onLaunch();
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-zinc-950 p-4 font-mono text-xs sm:text-sm text-pink-300">
      
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-black/40 backdrop-blur-md border border-pink-500/30 rounded-2xl p-6 shadow-2xl shadow-pink-500/5 relative overflow-hidden flex flex-col min-h-[380px]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-pink-500/20 pb-3 mb-4">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-pink-400" />
            <span className="text-pink-400 font-bold tracking-widest text-[10px] sm:text-xs">BIRTHDAY_SURPRISE_BOOT.SH</span>
          </div>
          <div className="flex space-x-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/75"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/75"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/75"></span>
          </div>
        </div>

        {/* Terminal Logs */}
        <div className="flex-grow space-y-2 text-left leading-relaxed">
          {logs.map((log, idx) => {
            const isTarget = log?.startsWith('Target Found');
            const isNameField = log?.startsWith('Name:');
            const isBold = isTarget || isNameField;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start ${
                  isBold ? 'text-pink-100 font-bold' : 'text-pink-400/80'
                }`}
              >
                <span className="text-pink-500 mr-2 select-none">&gt;</span>
                <span>{log}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Glow button space */}
        <div className="mt-8 flex justify-center items-center min-h-[64px]">
          {showButton && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLaunch}
              className="px-6 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-sans font-semibold tracking-wider rounded-xl shadow-lg shadow-pink-500/25 hover:shadow-pink-500/50 hover:brightness-110 flex items-center space-x-2 transition-all duration-300 pointer-events-auto"
            >
              <span>Launch Celebration</span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                🚀
              </motion.span>
            </motion.button>
          )}
        </div>
      </div>

      <div className="mt-6 text-[10px] text-pink-500/50 flex items-center space-x-1 tracking-wider">
        <span>Made with</span>
        <Heart className="w-3 h-3 fill-pink-500/40 text-pink-500/40" />
        <span>for a special person</span>
      </div>
    </div>
  );
}
