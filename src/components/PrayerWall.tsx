'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, HeartHandshake, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import confetti from 'canvas-confetti';

interface Prayer {
  id: string;
  name: string;
  message: string;
  created_at: string;
}

// Simple profanity filter placeholder
const filterProfanity = (text: string): string => {
  const blacklist = ['spam', 'abuse', 'offensiveword'];
  let cleanText = text;
  blacklist.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    cleanText = cleanText.replace(regex, '*'.repeat(word.length));
  });
  return cleanText;
};

export default function PrayerWall() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Validation rules
  const MIN_PRAYER_LENGTH = 5;
  const MAX_PRAYER_LENGTH = 10000;

  useEffect(() => {
    const fetchPrayers = async () => {
      if (!supabase) { setLoading(false); return; }
      const db = supabase;
      try {
        const { data, error } = await db
          .from('prayers')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setPrayers(data || []);
      } catch (e) {
        console.error('Error fetching prayers:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchPrayers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset messages
    setSuccessMsg('');
    setErrorMsg('');

    // Client-side validation & Trimming
    const trimmedName = name.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName) {
      setErrorMsg('Please enter your name.');
      return;
    }

    if (!trimmedMessage) {
      setErrorMsg('Please write your prayer.');
      return;
    }

    if (trimmedMessage.length < MIN_PRAYER_LENGTH) {
      setErrorMsg(`Your prayer must be at least ${MIN_PRAYER_LENGTH} characters long.`);
      return;
    }

    if (trimmedMessage.length > MAX_PRAYER_LENGTH) {
      setErrorMsg(`Your prayer cannot exceed ${MAX_PRAYER_LENGTH} characters.`);
      return;
    }

    // Apply simple profanity/moderation filter
    const cleanName = filterProfanity(trimmedName);
    const cleanMessage = filterProfanity(trimmedMessage);

    setSubmitting(true);

    if (!supabase) { setSubmitting(false); setErrorMsg('Database not available'); return; }

    try {
      const { data, error } = await supabase
        .from('prayers')
        .insert([{ name: cleanName, message: cleanMessage }])
        .select();

      if (error) throw error;

      // Update local state immediately (newest-first)
      if (data && data.length > 0) {
        setPrayers((prev) => [data[0], ...prev]);
      } else {
        // Fallback for mock client
        const fallbackPrayer: Prayer = {
          id: Math.random().toString(),
          name: cleanName,
          message: cleanMessage,
          created_at: new Date().toISOString()
        };
        setPrayers((prev) => [fallbackPrayer, ...prev]);
      }

      // Success feedback
      setSuccessMsg('Your prayer has been added successfully.');
      setName('');
      setMessage('');
      
      // Submit confetti burst!
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#FFD700', '#FFF', '#DA70D6']
      });

    } catch (e: any) {
      console.error('Submission error:', e);
      setErrorMsg('Failed to send prayer. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return '';
    }
  };

  return (
    <section id="prayers" className="py-16 px-4 max-w-4xl mx-auto scroll-mt-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        
        {/* Left Side: Submit Form */}
        <div className="md:col-span-2 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-300 flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-400" />
              <span>Prayer Wall 🙏</span>
            </h2>
            <p className="text-xs text-purple-200/60 leading-relaxed font-sans">
              Speak blessings, protection, favor, and beautiful intentions into Melvina’s new age.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md relative overflow-hidden">
            {/* Input Name */}
            <div className="space-y-1">
              <label htmlFor="prayer-name" className="text-xs font-semibold text-pink-300/80">Your Name</label>
              <input
                id="prayer-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                disabled={submitting}
                maxLength={50}
                required
                className="w-full bg-white/5 hover:bg-white/10 focus:bg-slate-900/50 border border-white/15 focus:border-pink-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-300/40 outline-none transition-all duration-300"
              />
            </div>

            {/* Input Prayer Message */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="prayer-message" className="text-xs font-semibold text-pink-300/80">Your Prayer</label>
                <span className="text-[10px] text-purple-300/40">{message.length}/700</span>
              </div>
              <textarea
                id="prayer-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your prayers and blessings for her new age..."
                disabled={submitting}
                rows={5}
                maxLength={MAX_PRAYER_LENGTH}
                required
                className="w-full bg-white/5 hover:bg-white/10 focus:bg-slate-900/50 border border-white/15 focus:border-pink-500/50 rounded-xl px-4 py-2.5 text-xs text-white placeholder-purple-300/40 outline-none transition-all duration-300 resize-none font-sans"
              />
            </div>

            {/* Notifications */}
            <AnimatePresence mode="wait">
              {errorMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] text-red-400 font-semibold"
                >
                  {errorMsg}
                </motion.p>
              )}
              {successMsg && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[11px] text-green-400 font-semibold flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-green-400" />
                  <span>{successMsg}</span>
                </motion.p>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-amber-500 to-rose-500 hover:brightness-110 disabled:brightness-75 text-white font-semibold rounded-xl transition-all duration-300 shadow-md shadow-pink-500/10 text-xs"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending Prayer...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Prayer 🙏</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Prayers Feed */}
        <div className="md:col-span-3 space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-2">
            <span className="text-xs font-semibold text-pink-300/80">Prayer logs</span>
            <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-mono">
              {prayers.length} {prayers.length === 1 ? 'prayer' : 'prayers'}
            </span>
          </div>

          <div className="space-y-4 max-h-[420px] overflow-y-auto pr-2 custom-scrollbar">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-2">
                <Loader2 className="w-6 h-6 text-pink-500 animate-spin" />
                <span className="text-xs text-purple-300/40">Loading prayers...</span>
              </div>
            ) : prayers.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-white/5">
                <p className="text-xs text-purple-300/40">No prayers left yet. Be the first!</p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {prayers.map((prayer, index) => (
                  <motion.div
                    key={prayer.id || index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/20 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-amber-200">{prayer.name}</h4>
                      <span className="text-[9px] text-purple-300/40 font-mono">
                        {formatDate(prayer.created_at)}
                      </span>
                    </div>
                    <p className="text-xs text-purple-200/80 leading-relaxed font-sans font-light break-words whitespace-pre-wrap">
                      {prayer.message}
                    </p>
                    <Sparkles className="absolute bottom-3 right-3 w-3.5 h-3.5 text-amber-400/10 group-hover:text-amber-400/30 group-hover:scale-110 transition-all duration-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
        
      </div>
    </section>
  );
}
