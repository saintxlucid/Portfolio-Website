import { supabase } from '../config/supabase.js';

export const soundService = {
  async uploadSound(soundData) {
    const { data, error } = await supabase
      .from('sounds')
      .insert([soundData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getSoundById(id) {
    const { data, error } = await supabase
      .from('sounds')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getTrendingSounds(limit = 20) {
    const { data, error } = await supabase
      .from('sounds')
      .select('*')
      .eq('is_featured', true)
      .order('trending_score', { ascending: false })
      .order('use_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async searchSounds(query, limit = 20) {
    const { data, error } = await supabase
      .from('sounds')
      .select('*')
      .ilike('title', `%${query}%`)
      .order('use_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async useSoundInVideo(videoId, soundId, soundStart = 0) {
    const { data, error } = await supabase
      .from('video_sounds')
      .insert([{
        video_id: videoId,
        sound_id: soundId,
        sound_start: soundStart
      }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('sounds')
      .update({ use_count: supabase.raw('use_count + 1') })
      .eq('id', soundId);

    return data;
  },

  async getPopularSounds(limit = 50) {
    const { data, error } = await supabase
      .from('sounds')
      .select('*')
      .order('use_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async updateSoundTrendingScore(soundId, score) {
    const { data, error } = await supabase
      .from('sounds')
      .update({ trending_score: score })
      .eq('id', soundId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
