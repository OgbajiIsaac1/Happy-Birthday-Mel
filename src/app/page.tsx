'use client';

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LaunchScreen from '@/components/LaunchScreen';
import FloatingHearts from '@/components/FloatingHearts';
import MusicPlayer, { type MusicPlayerHandle } from '@/components/MusicPlayer';
import HeroSection from '@/components/HeroSection';
import Countdown from '@/components/Countdown';
import MemoryGallery from '@/components/MemoryGallery';
import WishesWall from '@/components/WishesWall';
import PrayerWall from '@/components/PrayerWall';
import BlessingsBoard from '@/components/BlessingsBoard';
import FinalMessage from '@/components/FinalMessage';
import ShareButton from '@/components/ShareButton';

// Configurable her-name and birth-date placeholders:
// - HER NAME: Melvina Igboanugo
// - BIRTHDATE: July 9th
// - MUSIC PATH: /public/birthday-music.mp3
// - PHOTOS PATH: /public/images/ (referenced inside MemoryGallery.tsx)

export default function Home() {
  const [isLaunched, setIsLaunched] = useState(false);
  const musicRef = useRef<MusicPlayerHandle>(null);

  const handleLaunch = () => {
    musicRef.current?.play();
    setIsLaunched(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-zinc-950 text-white relative overflow-x-hidden flex flex-col font-sans select-none">
      
      {/* Dynamic Background Glow Elements (Ambient Light) */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-pink-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <AnimatePresence mode="wait">
        {!isLaunched ? (
          <motion.div
            key="launch"
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="w-full"
          >
            <LaunchScreen onLaunch={handleLaunch} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full flex-grow flex flex-col pointer-events-auto"
          >
            {/* Ambient Flying Hearts & Balloons (particle system) */}
            <FloatingHearts active={isLaunched} />

            {/* Floating Action Button (FAB) for music play/pause toggle */}
            <MusicPlayer ref={musicRef} show={isLaunched} />

            {/* Scrollable Container of Surprises */}
            <main className="flex-grow w-full max-w-5xl mx-auto flex flex-col relative z-20">
              
              {/* 1. Hero Greetings Header */}
              <HeroSection />

              {/* 2. Live Countdown to Her Special Day */}
              <Countdown />

              {/* 3. Photos Lightbox Gallery */}
              <MemoryGallery />

              {/* 4. Birthday Wishes Wall */}
              <WishesWall />

              {/* 5. Birthday Prayers Wall */}
              <PrayerWall />

              {/* 6. Tag Cloud Declarations of Blessings */}
              <BlessingsBoard />

              {/* 7. Warm Cursive Letter Card */}
              <FinalMessage />

              {/* 8. WhatsApp Sharing Widget */}
              <ShareButton />

            </main>

            {/* Footer */}
            <footer className="w-full py-8 text-center border-t border-white/5 relative z-20 bg-black/10 backdrop-blur-sm">
              <p className="text-[10px] text-purple-300/40 uppercase tracking-widest font-mono">
                A Special Day for Melvina Igboanugo • July 9
              </p>
              <p className="text-[9px] text-purple-300/30 font-sans mt-1">
                Celebrating a beautiful life, today and always.
              </p>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
