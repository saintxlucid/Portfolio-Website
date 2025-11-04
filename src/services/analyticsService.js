import { supabase } from '../config/supabase.js';

export const analyticsService = {
  async recordVideoView(videoId, userId) {
    const { error: updateError } = await supabase
      .from('videos')
      .update({ view_count: supabase.raw('view_count + 1') })
      .eq('id', videoId);

    if (updateError) throw updateError;

    const today = new Date().toISOString().split('T')[0];

    const { data: existingAnalytics } = await supabase
      .from('video_engagement_analytics')
      .select('*')
      .eq('video_id', videoId)
      .eq('date', today)
      .maybeSingle();

    if (existingAnalytics) {
      const { error } = await supabase
        .from('video_engagement_analytics')
        .update({ watch_count: supabase.raw('watch_count + 1') })
        .eq('id', existingAnalytics.id);

      if (error) throw error;
    } else {
      const { error } = await supabase
        .from('video_engagement_analytics')
        .insert([{
          video_id: videoId,
          date: today,
          watch_count: 1
        }]);

      if (error) throw error;
    }

    return { success: true };
  },

  async getVideoAnalytics(videoId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from('video_engagement_analytics')
      .select('*')
      .eq('video_id', videoId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getVideoStats(videoId) {
    const { data: video, error } = await supabase
      .from('videos')
      .select('view_count, like_count, comment_count, share_count')
      .eq('id', videoId)
      .maybeSingle();

    if (error) throw error;

    const { count: likeCount } = await supabase
      .from('likes')
      .select('id', { count: 'exact' })
      .eq('target_id', videoId)
      .eq('target_type', 'video');

    const { count: commentCount } = await supabase
      .from('comments')
      .select('id', { count: 'exact' })
      .eq('parent_id', videoId)
      .eq('parent_type', 'video');

    return {
      ...video,
      likeCount,
      commentCount
    };
  },

  async getCreatorAnalytics(creatorId, days = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data: videos, error: videosError } = await supabase
      .from('videos')
      .select('id')
      .eq('author_id', creatorId);

    if (videosError) throw videosError;

    const videoIds = videos.map(v => v.id);

    if (videoIds.length === 0) {
      return {
        totalViews: 0,
        totalLikes: 0,
        totalComments: 0,
        totalShares: 0,
        videos: []
      };
    }

    const { data: analytics, error: analyticsError } = await supabase
      .from('video_engagement_analytics')
      .select('*')
      .in('video_id', videoIds)
      .gte('date', startDate.toISOString().split('T')[0]);

    if (analyticsError) throw analyticsError;

    const totalViews = analytics.reduce((sum, a) => sum + a.watch_count, 0);

    const { data: videoStats, error: statsError } = await supabase
      .from('videos')
      .select('id, like_count, comment_count, share_count')
      .eq('author_id', creatorId);

    if (statsError) throw statsError;

    const totalLikes = videoStats.reduce((sum, v) => sum + v.like_count, 0);
    const totalComments = videoStats.reduce((sum, v) => sum + v.comment_count, 0);
    const totalShares = videoStats.reduce((sum, v) => sum + v.share_count, 0);

    return {
      totalViews,
      totalLikes,
      totalComments,
      totalShares,
      videoCount: videoIds.length,
      analytics
    };
  },

  async getFollowerGrowth(userId, days = 30) {
    const { count: totalFollowers } = await supabase
      .from('followers')
      .select('id', { count: 'exact' })
      .eq('following_id', userId);

    return {
      totalFollowers,
      growth: 'data_not_tracked'
    };
  },

  async getEngagementRate(videoId) {
    const { data: video, error } = await supabase
      .from('videos')
      .select('view_count, like_count, comment_count, share_count')
      .eq('id', videoId)
      .maybeSingle();

    if (error) throw error;

    if (!video || video.view_count === 0) return 0;

    const engagementCount = video.like_count + video.comment_count + video.share_count;
    return ((engagementCount / video.view_count) * 100).toFixed(2);
  }
};
