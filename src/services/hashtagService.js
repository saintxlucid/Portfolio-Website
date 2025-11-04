import { supabase } from '../config/supabase.js';

export const hashtagService = {
  async getTrendingHashtags(limit = 20) {
    const { data, error } = await supabase
      .from('trending_hashtags')
      .select('*')
      .order('trending_rank', { ascending: true })
      .order('trending_score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getHashtagVideos(hashtag, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('hashtag_videos')
      .select('*, video:videos(id, title, description, video_url, thumbnail_url, author_id, like_count, view_count)')
      .eq('hashtag', hashtag.toLowerCase().replace('#', ''))
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async searchHashtags(query, limit = 20) {
    const { data, error } = await supabase
      .from('trending_hashtags')
      .select('*')
      .ilike('hashtag', `%${query}%`)
      .order('usage_count', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async addHashtagToVideo(videoId, hashtag) {
    const cleanHashtag = hashtag.toLowerCase().replace('#', '');

    const { data: existingHashtag, error: selectError } = await supabase
      .from('trending_hashtags')
      .select('*')
      .eq('hashtag', cleanHashtag)
      .maybeSingle();

    if (selectError) throw selectError;

    if (existingHashtag) {
      await supabase
        .from('trending_hashtags')
        .update({ usage_count: supabase.raw('usage_count + 1') })
        .eq('hashtag', cleanHashtag);
    } else {
      await supabase
        .from('trending_hashtags')
        .insert([{
          hashtag: cleanHashtag,
          usage_count: 1,
          trending_score: 0
        }]);
    }

    const { data, error } = await supabase
      .from('hashtag_videos')
      .insert([{
        video_id: videoId,
        hashtag: cleanHashtag
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getHashtagStats(hashtag) {
    const { data, error } = await supabase
      .from('trending_hashtags')
      .select('*')
      .eq('hashtag', hashtag.toLowerCase())
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateTrendingScores() {
    const { data: hashtags, error } = await supabase
      .from('trending_hashtags')
      .select('*');

    if (error) throw error;

    for (const hashtag of hashtags) {
      const score = (hashtag.usage_count * 0.7) + (hashtag.trending_rank || 0);

      await supabase
        .from('trending_hashtags')
        .update({ trending_score: score })
        .eq('hashtag', hashtag.hashtag);
    }

    return { success: true };
  }
};
