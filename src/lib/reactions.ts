import { supabase } from './supabaseClient';

export type TargetType = 'wish' | 'prayer' | 'blessing';
export type ReactionType = 'like' | 'love' | 'amen';

export async function fetchReactionCounts(targetType: TargetType, targetIds: string[]) {
  if (!supabase || targetIds.length === 0) return {};
  const { data } = await supabase
    .from('reactions')
    .select('target_id, reaction_type')
    .in('target_id', targetIds)
    .eq('target_type', targetType);

  const counts: Record<string, { likes: number; loves: number; amens: number }> = {};
  for (const id of targetIds) {
    counts[id] = { likes: 0, loves: 0, amens: 0 };
  }
  for (const r of data || []) {
    if (r.reaction_type === 'like') counts[r.target_id].likes++;
    else if (r.reaction_type === 'love') counts[r.target_id].loves++;
    else if (r.reaction_type === 'amen') counts[r.target_id].amens++;
  }
  return counts;
}

export async function addReaction(targetType: TargetType, targetId: string, reactionType: ReactionType) {
  if (!supabase) return;
  await supabase.from('reactions').insert({ target_type: targetType, target_id: targetId, reaction_type: reactionType });
}

export interface Reply {
  id: string;
  target_id: string;
  author: string;
  message: string;
  created_at: string;
}

export async function fetchReplies(targetType: TargetType, targetIds: string[]) {
  if (!supabase || targetIds.length === 0) return {};
  const { data } = await supabase
    .from('replies')
    .select('*')
    .in('target_id', targetIds)
    .eq('target_type', targetType)
    .order('created_at', { ascending: true });

  const grouped: Record<string, Reply[]> = {};
  for (const id of targetIds) {
    grouped[id] = [];
  }
  for (const r of data || []) {
    if (!grouped[r.target_id]) grouped[r.target_id] = [];
    grouped[r.target_id].push(r);
  }
  return grouped;
}

export async function addReply(targetType: TargetType, targetId: string, author: string, message: string) {
  if (!supabase) return null;
  const { data } = await supabase
    .from('replies')
    .insert({ target_type: targetType, target_id: targetId, author, message })
    .select()
    .single();
  return data;
}
