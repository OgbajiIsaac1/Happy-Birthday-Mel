'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Loader2, Heart } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { fetchReactionCounts, addReaction } from '@/lib/reactions';
import confetti from 'canvas-confetti';

interface Blessing {
  id: string;
  blessing: string;
  created_at: string;
}

const TAG_COLORS = [
  'bg-pink-500/10 text-pink-300 border-pink-500/30',
  'bg-purple-500/10 text-purple-300 border-purple-500/30',
  'bg-amber-500/10 text-amber-300 border-amber-500/30',
  'bg-rose-500/10 text-rose-300 border-rose-500/30',
  'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
  'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
  'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
  'bg-teal-500/10 text-teal-300 border-teal-500/30',
];

export default function BlessingsBoard() {
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [newBlessing, setNewBlessing] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [reactionCounts, setReactionCounts] = useState<Record<string, { likes: number; loves: number; amens: number }>>({});
  const [reacted, setReacted] = useState<Record<string, boolean>>({});

  const fetchData = useCallback(async () => {
    if (!supabase) { setLoading(false); return; }
    const db = supabase;
    try {
      const { data, error } = await db
        .from('blessings')
        .select('*')
        .order('created_at', { ascending: true });
      if (error) throw error;
      const blessingsData = data || [];
      setBlessings(blessingsData);

      const ids = blessingsData.map((b: Blessing) => b.id);
      const counts = await fetchReactionCounts('blessing', ids);
      setReactionCounts(counts);
    } catch (e) {
      console.error('Error fetching blessings:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmed = newBlessing.trim();
    if (!trimmed) { setErrorMsg('Please enter a blessing.'); return; }
    if (trimmed.length < 2) { setErrorMsg('Too short! Try a full word.'); return; }
    if (trimmed.length > 25) { setErrorMsg('Please keep the blessing under 25 characters.'); return; }

    const formattedBlessing = trimmed
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');

    setSubmitting(true);

    if (!supabase) { setSubmitting(false); setErrorMsg('Database not available'); return; }
    const db = supabase;

    try {
      const { data, error } = await db
        .from('blessings')
        .insert([{ blessing: formattedBlessing }])
        .select();

      if (error) throw error;

      if (data && data.length > 0) {
        setBlessings((prev) => [...prev, data[0]]);
        setReactionCounts((prev) => ({ ...prev, [data[0].id]: { likes: 0, loves: 0, amens: 0 } }));
      } else {
        const fallbackBlessing: Blessing = {
          id: Math.random().toString(),
          blessing: formattedBlessing,
          created_at: new Date().toISOString(),
        };
        setBlessings((prev) => [...prev, fallbackBlessing]);
        setReactionCounts((prev) => ({ ...prev, [fallbackBlessing.id]: { likes: 0, loves: 0, amens: 0 } }));
      }

      setNewBlessing('');
      confetti({ particleCount: 30, scalar: 1.2, angle: 90, spread: 45, origin: { y: 0.85 }, colors: ['#A78BFA', '#F472B6', '#FBBF24'] });
    } catch (e) {
      console.error('Error adding blessing:', e);
      setErrorMsg('Failed to add blessing.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReact = async (blessingId: string, type: 'like' | 'love') => {
    if (reacted[blessingId + type]) return;
    setReacted((prev) => ({ ...prev, [blessingId + type]: true }));
    setReactionCounts((prev) => ({
      ...prev,
      [blessingId]: { ...prev[blessingId], [type === 'like' ? 'likes' : 'loves']: (prev[blessingId]?.[type === 'like' ? 'likes' : 'loves'] ?? 0) + 1 },
    }));
    await addReaction('blessing', blessingId, type);
  };

  return (
    <section className="py-16 px-4 max-w-4xl mx-auto">
      <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md relative overflow-hidden shadow-2xl space-y-8">

        <div className="absolute -top-24 -right-24 w-48 h-48 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-rose-300 to-amber-300 flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <span>Blessings For Her New Age</span>
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/60 max-w-md mx-auto">
            What word or short phrase do you speak over Melvina&apos;s new age? Add it to her board of declarations.
          </p>
        </div>

        <div className="min-h-[180px] sm:min-h-[220px] flex flex-wrap items-center justify-center gap-3 p-4 sm:p-6 border border-white/5 bg-black/10 rounded-2xl relative overflow-hidden">
          {loading ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <Loader2 className="w-6 h-6 text-pink-500 animate-spin" />
              <span className="text-xs text-purple-300/40">Gathering blessings...</span>
            </div>
          ) : blessings.length === 0 ? (
            <p className="text-xs text-purple-300/40 italic">The board is empty. Add a word of blessing below!</p>
          ) : (
            <AnimatePresence>
              {blessings.map((b, index) => {
                const colorIndex = b.blessing.charCodeAt(0) % TAG_COLORS.length;
                const tagColorClass = TAG_COLORS[colorIndex];
                const counts = reactionCounts[b.id] || { likes: 0, loves: 0, amens: 0 };

                return (
                  <motion.div key={b.id || index} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border shadow-md flex items-center gap-2 transition-all duration-300 ${tagColorClass}`}>
                    <span>{b.blessing}</span>
                    <span className="flex items-center gap-1 ml-1">
                      <button onClick={(e) => { e.stopPropagation(); handleReact(b.id, 'like'); }} disabled={reacted[b.id + 'like']}
                        className={`text-[9px] flex items-center gap-0.5 transition-all ${reacted[b.id + 'like'] ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
                        <Heart className={`w-2.5 h-2.5 ${reacted[b.id + 'like'] ? 'fill-current' : ''}`} />
                        <span>{counts.likes}</span>
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); handleReact(b.id, 'love'); }} disabled={reacted[b.id + 'love']}
                        className={`text-[9px] flex items-center gap-0.5 transition-all ${reacted[b.id + 'love'] ? 'opacity-100' : 'opacity-50 hover:opacity-100'}`}>
                        <span>💕</span>
                        <span>{counts.loves}</span>
                      </button>
                    </span>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
          <div className="flex-grow space-y-1">
            <input type="text" value={newBlessing}
              onChange={(e) => setNewBlessing(e.target.value)}
              placeholder="e.g. Grace, Joy, Favor, Success..." disabled={submitting} maxLength={25} required
              className="w-full bg-white/5 hover:bg-white/10 focus:bg-slate-900/50 border border-white/15 focus:border-pink-500/50 rounded-xl px-4 py-3 text-xs text-white placeholder-purple-300/40 outline-none transition-all duration-300"
            />
            {errorMsg && <p className="text-[10px] text-red-400 font-semibold pl-1">{errorMsg}</p>}
          </div>
          <button type="submit" disabled={submitting}
            className="px-5 py-3 sm:py-0 bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:brightness-110 disabled:brightness-75 text-white font-semibold rounded-xl transition-all duration-300 shadow-md text-xs flex items-center justify-center space-x-1.5 shrink-0">
            {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus className="w-4 h-4" /><span>Add Blessing</span></>}
          </button>
        </form>

      </div>
    </section>
  );
}
