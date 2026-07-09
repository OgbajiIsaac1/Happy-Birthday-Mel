'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

interface Memory {
  id: number;
  url: string;
  caption: string;
  description: string;
}

// Configurable photos list:
// - Replace 'url' with her real photo paths (e.g., '/images/pic1.jpg' or external URLs).
// - Place local images in the /public folder (e.g., /public/images/pic1.jpg) and reference them as '/images/pic1.jpg'.

const MEMORIES: Memory[] = [
  { id: 1, url: '/images/mel1.png', caption: 'A smile worth celebrating', description: 'A moment captured in pure joy, lighting up the entire room.' },
  { id: 2, url: '/images/mel2.png', caption: 'A joyful moment', description: 'Radiating positive vibes and showing the world what happiness looks like.' },
  { id: 3, url: '/images/mel3.png', caption: 'A beautiful memory', description: 'Cherishing the laughter, the friendship, and the good times.' },
  { id: 4, url: '/images/mel4.png', caption: 'Friendship and happiness', description: 'To the countless jokes shared and the beautiful bond that keeps growing.' },
  { id: 5, url: '/images/mel5.jpeg', caption: 'Elegance and grace', description: 'Celebrating the amazing person you are, inside and out.' },
  { id: 6, url: '/images/mel6.jpeg', caption: 'A beautiful day', description: 'May your future be as bright and beautiful as your spirit.' },
  { id: 7, url: '/images/mel7.jpeg', caption: 'Radiant energy', description: 'Your light shines bright and touches everyone around you.' },
  { id: 8, url: '/images/mel8.jpeg', caption: 'Treasured moments', description: 'Every memory with you is a gift we hold close.' },
  { id: 9, url: '/images/mel9.jpeg', caption: 'Pure joy', description: 'Your laughter is the sweetest melody.' },
  { id: 10, url: '/images/mel10.jpeg', caption: 'Shining bright', description: 'A star in every way, lighting up every room you walk into.' },
  { id: 11, url: '/images/mel11.jpeg', caption: 'Simply beautiful', description: 'Grace, kindness, and beauty all wrapped in one.' },
  { id: 12, url: '/images/mel12.jpeg', caption: 'Lovely spirit', description: 'Your heart and soul make the world a better place.' },
  { id: 13, url: '/images/mel13.jpeg', caption: 'Golden moments', description: 'Time spent with you is always time well spent.' },
  { id: 14, url: '/images/mel14.jpeg', caption: 'Blessed to know you', description: 'Some people make life brighter — you are one of them.' },
  { id: 15, url: '/images/mel15.jpeg', caption: 'Celebrating you', description: 'Today and always, you deserve all the joy in the world.' },
  { id: 16, url: '/images/10.png', caption: 'Beautiful soul', description: 'Your kindness and warmth inspire everyone around you.' },
  { id: 17, url: '/images/mel16.jpg', caption: 'One in a million', description: 'There is no one quite like you — and that is your superpower.' },
  { id: 18, url: '/images/mel17.png', caption: 'Forever grateful', description: 'For every laugh, every hug, and every beautiful memory.' }
];

export default function MemoryGallery() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <section id="gallery" className="py-16 px-4 max-w-6xl mx-auto scroll-mt-6">
      
      {/* Section Header */}
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-300">
          Precious Memories 📸
        </h2>
        <p className="text-xs sm:text-sm text-purple-200/60 max-w-md mx-auto">
          A glimpse into the beautiful moments, laughs, and stories we share.
        </p>
      </div>

      {/* Grid Layout */}
      {/* 1 column on small phones, 2 columns on tablets, 3 columns on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MEMORIES.map((memory) => (
          <div
            key={memory.id}
            onClick={() => setSelectedMemory(memory)}
            className="group relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-lg cursor-pointer hover:border-pink-500/30 hover:shadow-pink-500/5 hover:-translate-y-1 transition-all duration-300 aspect-[4/5] flex flex-col"
          >
            {/* Image Wrapper */}
            <div className="relative flex-grow overflow-hidden bg-purple-950/20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={memory.url}
                alt={memory.caption}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                style={memory.url === '/images/mel17.png' ? { objectPosition: 'center 35%' } : { objectPosition: 'center' }}
              />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-3 bg-white/10 border border-white/20 backdrop-blur-md rounded-full text-white scale-75 group-hover:scale-100 transition-all duration-300">
                  <ZoomIn className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Caption */}
            <div className="p-4 bg-black/20 border-t border-white/5 backdrop-blur-sm">
              <h3 className="text-sm font-semibold text-pink-200 tracking-wide">
                {memory.caption}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
            
            {/* Click outside to close */}
            <div
              className="absolute inset-0 cursor-default"
              onClick={() => setSelectedMemory(null)}
            />

            {/* Lightbox Content Container */}
            <div
              className="relative w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg flex flex-col md:flex-row z-10 max-h-[85vh] md:max-h-[70vh] cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMemory(null)}
                aria-label="Close lightbox"
                className="absolute top-4 right-4 p-2 bg-black/50 border border-white/10 hover:bg-black/80 rounded-full text-white z-20 hover:scale-105 transition-all duration-200"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-[60%] bg-black/30 flex items-center justify-center overflow-hidden min-h-[30vh] md:min-h-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedMemory.url}
                  alt={selectedMemory.caption}
                  className="w-full h-full object-contain max-h-[50vh] md:max-h-[70vh]"
                />
              </div>

              {/* Details Side */}
              <div className="w-full md:w-[40%] p-6 sm:p-8 flex flex-col justify-center space-y-4 border-t md:border-t-0 md:border-l border-white/10 bg-gradient-to-b from-transparent to-purple-950/20 overflow-y-auto">
                <span className="text-[10px] sm:text-xs font-semibold text-pink-400 tracking-widest uppercase">
                  Captured Memory
                </span>
                
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-300">
                  {selectedMemory.caption}
                </h3>
                
                <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed font-sans">
                  {selectedMemory.description}
                </p>
                
                <div className="pt-4 border-t border-white/5 flex items-center space-x-2 text-[10px] text-pink-300/60 font-mono">
                  <span>MELVINA IGBOANUGO</span>
                  <span>•</span>
                  <span>JULY 9</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
