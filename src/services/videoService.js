import { supabase } from '../config/supabase.js';

export const videoService = {
  async uploadVideo(videoData) {
    const { data, error } = await supabase
      .from('videos')
      .insert([videoData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getVideoById(id) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getForYouFeed(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('is_for_you_feed', true)
      .eq('visibility', 'public')
      .order('trending_score', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getFollowingFeed(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .in('author_id', (
        supabase.from('followers')
          .select('following_id')
          .eq('follower_id', userId)
      ))
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getUserVideos(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('author_id', userId)
      .eq('visibility', 'public')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async updateVideo(id, updates) {
    const { data, error } = await supabase
      .from('videos')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteVideo(id) {
    const { error } = await supabase
      .from('videos')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async likeVideo(userId, videoId) {
    const { data, error } = await supabase
      .from('likes')
      .insert([{ user_id: userId, target_id: videoId, target_type: 'video' }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('videos')
      .update({ like_count: supabase.raw('like_count + 1') })
      .eq('id', videoId);

    return data;
  },

  async unlikeVideo(userId, videoId) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('target_id', videoId)
      .eq('target_type', 'video');

    if (error) throw error;

    await supabase
      .from('videos')
      .update({ like_count: supabase.raw('GREATEST(like_count - 1, 0)') })
      .eq('id', videoId);

    return { success: true };
  },

  async shareVideo(userId, videoId, sharedVia = 'profile') {
    const { data, error } = await supabase
      .from('shares')
      .insert([{ user_id: userId, content_id: videoId, content_type: 'video', shared_via: sharedVia }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('videos')
      .update({ share_count: supabase.raw('share_count + 1') })
      .eq('id', videoId);

    return data;
  },

  async recordView(videoId) {
    const { data, error } = await supabase
      .from('videos')
      .update({ view_count: supabase.raw('view_count + 1') })
      .eq('id', videoId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async searchByHashtag(hashtag, limit = 20) {
    const { data, error } = await supabase
      .from('hashtag_videos')
      .select('video:videos(id, title, description, video_url, thumbnail_url, author_id, like_count, view_count)')
      .eq('hashtag', hashtag.toLowerCase().replace('#', ''))
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getTrendingVideos(limit = 20) {
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('visibility', 'public')
      .order('trending_score', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async createDuet(duetVideoId, originalVideoId, originalCreatorId) {
    const { data, error } = await supabase
      .from('duets')
      .insert([{
        duet_video_id: duetVideoId,
        original_video_id: originalVideoId,
        original_creator_id: originalCreatorId
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createStitch(stitchVideoId, originalVideoId, originalCreatorId, segmentUrl) {
    const { data, error } = await supabase
      .from('stitches')
      .insert([{
        stitch_video_id: stitchVideoId,
        original_video_id: originalVideoId,
        original_creator_id: originalCreatorId,
        stitch_segment_url: segmentUrl
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getVideoSound(videoId) {
    const { data, error } = await supabase
      .from('video_sounds')
      .select('sound:sounds(id, title, audio_url, duration, use_count)')
      .eq('video_id', videoId)
      .maybeSingle();

    if (error) throw error;
    return data;
  }
};
