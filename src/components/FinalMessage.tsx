'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

// Configurable placeholders:
// - PERSONAL LETTER TITLE: A Special Message For You
// - PERSONAL MESSAGE: This little website was created specially for you because your birthday deserves more than an ordinary message. May this new age bring you closer to your dreams, surround you with genuine love, and fill your heart with peace and happiness. Happy Birthday once again. You are deeply celebrated.
// - CLOSING SIGNATURE: With love, from your friend ❤️

export default function FinalMessage() {
  return (
    <section className="py-16 px-4 max-w-3xl mx-auto text-center relative">
      {/* Background glow blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
        className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-6 max-w-xl mx-auto"
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 to-rose-500" />
        <div className="flex justify-center">
          <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-full">
            <Heart className="w-6 h-6 text-pink-400 fill-pink-500/30 animate-pulse" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-pink-200">
          A Special Message For You
        </h2>

        {/* Letter Body */}
        <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed font-sans italic whitespace-pre-line text-left border-t border-b border-white/5 py-6">
          This little website was created specially for you because your birthday deserves more than an ordinary message.
          
          May this new age bring you closer to your dreams, surround you with genuine love, and fill your heart with peace and happiness. Happy Birthday once again. You are deeply celebrated.
        </p>

        {/* Signature */}
        <div className="space-y-1 pt-2">
          <p className="text-[10px] text-pink-400/60 uppercase tracking-widest font-mono">Closing Letter</p>
          <p className="text-sm font-sans font-semibold text-pink-300">
            With love, from your friend ❤️
          </p>
        </div>

      </motion.div>
    </section>
  );
}
