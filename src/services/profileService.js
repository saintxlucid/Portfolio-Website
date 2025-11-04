import { supabase } from '../config/supabase.js';

export const profileService = {
  async getProfileByUsername(username) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getProfileById(id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async createProfile(profileData) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateProfile(id, updates) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async searchProfiles(query, limit = 20) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .or(`username.ilike.%${query}%,display_name.ilike.%${query}%`)
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async getFollowers(userId) {
    const { data, error } = await supabase
      .from('followers')
      .select('follower_id, follower:profiles!followers_follower_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('following_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getFollowing(userId) {
    const { data, error } = await supabase
      .from('followers')
      .select('following_id, following:profiles!followers_following_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('follower_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async isFollowing(followerId, followingId) {
    const { data, error } = await supabase
      .from('followers')
      .select('id')
      .eq('follower_id', followerId)
      .eq('following_id', followingId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  async follow(followerId, followingId) {
    const { data, error } = await supabase
      .from('followers')
      .insert([{ follower_id: followerId, following_id: followingId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async unfollow(followerId, followingId) {
    const { error } = await supabase
      .from('followers')
      .delete()
      .eq('follower_id', followerId)
      .eq('following_id', followingId);

    if (error) throw error;
    return { success: true };
  },

  async blockUser(blockerId, blockedId) {
    const { data, error } = await supabase
      .from('blocks')
      .insert([{ blocker_id: blockerId, blocked_id: blockedId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async unblockUser(blockerId, blockedId) {
    const { error } = await supabase
      .from('blocks')
      .delete()
      .eq('blocker_id', blockerId)
      .eq('blocked_id', blockedId);

    if (error) throw error;
    return { success: true };
  },

  async isBlocked(blockerId, blockedId) {
    const { data, error } = await supabase
      .from('blocks')
      .select('id')
      .eq('blocker_id', blockerId)
      .eq('blocked_id', blockedId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  }
};
