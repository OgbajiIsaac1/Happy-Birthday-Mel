'use client';

import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion } from 'framer-motion';

export interface MusicPlayerHandle {
  play: () => void;
}

interface MusicPlayerProps {
  show: boolean;
}

export default forwardRef<MusicPlayerHandle, MusicPlayerProps>(function MusicPlayer({ show }, ref) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current && !hasError) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    },
  }));

  const togglePlay = () => {
    if (!audioRef.current || hasError) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.error('Playback failed', err);
        });
    }
  };

  const handleAudioError = () => {
    console.warn('Audio file /birthday-music.mp3 not found or failed to load. Operating in silent mode.');
    setHasError(true);
    setIsPlaying(false);
  };

  if (hasError) {
    return null;
  }

  return (
    <>
      <audio
        ref={audioRef}
        src="/birthday-music.mp3"
        loop
        onError={handleAudioError}
        preload="auto"
      />
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <button
            onClick={togglePlay}
            aria-label="Toggle Background Music"
            className="flex items-center justify-center w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 relative group"
          >
            {isPlaying ? (
              <>
                <Volume2 className="w-5 h-5 text-pink-300" />
                <span className="absolute inset-0 rounded-full border border-pink-400/50 animate-ping pointer-events-none scale-105"></span>
                <span className="absolute inset-0 rounded-full border border-purple-400/30 animate-pulse pointer-events-none scale-125"></span>
              </>
            ) : (
              <VolumeX className="w-5 h-5 text-gray-400" />
            )}
            
            <motion.div
              animate={{ rotate: isPlaying ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 4, ease: 'linear' }}
              className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full p-1 shadow-md"
            >
              <Music className="w-3 h-3 text-white" />
            </motion.div>

            <span className="absolute right-14 bg-slate-900/90 text-white text-xs px-2.5 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-white/10 pointer-events-none">
              {isPlaying ? 'Pause Birthday Music' : 'Play Birthday Music'}
            </span>
          </button>
        </motion.div>
      )}
    </>
  );
});
