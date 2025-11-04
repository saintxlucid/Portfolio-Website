import { supabase } from '../config/supabase.js';

export const storyService = {
  async createStory(storyData) {
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24);

    const { data, error } = await supabase
      .from('stories')
      .insert([{ ...storyData, expires_at: expiresAt.toISOString() }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getStoryById(id) {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserStories(userId) {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .eq('author_id', userId)
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getFollowingStories(userId) {
    const { data, error } = await supabase
      .from('stories')
      .select('*, author:profiles!stories_author_id_fkey(id, username, display_name, profile_picture_url)')
      .in('author_id', (
        supabase.from('followers')
          .select('following_id')
          .eq('follower_id', userId)
      ))
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async recordStoryView(storyId) {
    const { data, error } = await supabase
      .from('stories')
      .update({ view_count: supabase.raw('view_count + 1') })
      .eq('id', storyId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteStory(id) {
    const { error } = await supabase
      .from('stories')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async getStoryViews(storyId) {
    const story = await this.getStoryById(storyId);
    return story?.view_count || 0;
  },

  async updateStoryStickers(storyId, stickerData) {
    const { data, error } = await supabase
      .from('stories')
      .update({ sticker_data: stickerData })
      .eq('id', storyId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
