'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageCircleHeart, HeartHandshake, Image as ImageIcon } from 'lucide-react';

// Configurable placeholders:
// - HER NAME: Melvina Igboanugo
// - BIRTHDAY DATE: July 9th

export default function HeroSection() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-20 pb-12 overflow-hidden">
      
      {/* Glow Circles background */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Floating Sparkles & Hearts */}
      <div className="absolute top-20 left-1/4 animate-bounce text-pink-400/40 pointer-events-none select-none">✨</div>
      <div className="absolute bottom-40 right-1/4 animate-pulse text-amber-400/30 pointer-events-none select-none">✨</div>
      
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto space-y-6"
      >
        <div className="inline-flex items-center space-x-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full backdrop-blur-md text-pink-300 text-xs sm:text-sm shadow-md animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>July 9th Celebration</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold font-sans text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-300 tracking-tight leading-tight">
          Happy Birthday, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">
            MELVINA IGBOANUGO
          </span> 🎉
        </h1>

        <p className="text-sm sm:text-base text-purple-200/80 max-w-lg mx-auto font-medium leading-relaxed">
          Today is all about celebrating your life, your joy, your kindness, and the beautiful blessing you are to everyone around you.
        </p>

        {/* Message Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-purple-500/5 max-w-xl mx-auto overflow-hidden group"
        >
          {/* Subtle gold highlight borders */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500" />
          
          <p className="text-xs sm:text-sm text-pink-100/90 leading-relaxed font-sans italic relative z-10">
            &ldquo;May this new year of your life bring you divine favor, peace, happiness, good health, success, open doors, and countless reasons to smile. You are loved, valued, and celebrated today and always.&rdquo;
          </p>

          {/* Background overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
        </motion.div>

        {/* Navigation Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-6"
        >
          <button
            onClick={() => scrollToSection('wishes')}
            className="flex items-center space-x-2 px-5 py-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-lg shadow-pink-500/20 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <MessageCircleHeart className="w-4 h-4" />
            <span>Leave a Wish</span>
          </button>

          <button
            onClick={() => scrollToSection('prayers')}
            className="flex items-center space-x-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
          >
            <HeartHandshake className="w-4 h-4 text-pink-300" />
            <span>Say a Prayer</span>
          </button>

          <button
            onClick={() => scrollToSection('gallery')}
            className="flex items-center space-x-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 text-xs sm:text-sm font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300 backdrop-blur-sm"
          >
            <ImageIcon className="w-4 h-4 text-amber-300" />
            <span>View Memories</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
