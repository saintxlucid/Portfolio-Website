import { supabase } from '../config/supabase.js';

export const postService = {
  async createPost(postData) {
    const { data, error } = await supabase
      .from('posts')
      .insert([postData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getPostById(id) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getPostsByAuthor(authorId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', authorId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getFeed(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .or(`visibility.eq.public,and(visibility.eq.friends,author_id.in(select following_id from followers where follower_id=eq.${userId}))`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async updatePost(id, updates) {
    const { data, error } = await supabase
      .from('posts')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deletePost(id) {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async likePost(userId, postId) {
    const { data, error } = await supabase
      .from('likes')
      .insert([{ user_id: userId, target_id: postId, target_type: 'post' }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('posts')
      .update({ like_count: supabase.raw('like_count + 1') })
      .eq('id', postId);

    return data;
  },

  async unlikePost(userId, postId) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('target_id', postId)
      .eq('target_type', 'post');

    if (error) throw error;

    await supabase
      .from('posts')
      .update({ like_count: supabase.raw('GREATEST(like_count - 1, 0)') })
      .eq('id', postId);

    return { success: true };
  },

  async hasLiked(userId, postId) {
    const { data, error } = await supabase
      .from('likes')
      .select('id')
      .eq('user_id', userId)
      .eq('target_id', postId)
      .eq('target_type', 'post')
      .maybeSingle();

    if (error) throw error;
    return !!data;
  },

  async getPostLikes(postId, limit = 20) {
    const { data, error } = await supabase
      .from('likes')
      .select('user_id, profile:profiles!likes_user_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('target_id', postId)
      .eq('target_type', 'post')
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async sharePost(userId, postId, sharedVia = 'profile') {
    const { data, error } = await supabase
      .from('shares')
      .insert([{ user_id: userId, content_id: postId, content_type: 'post', shared_via: sharedVia }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('posts')
      .update({ share_count: supabase.raw('share_count + 1') })
      .eq('id', postId);

    return data;
  },

  async getPinned(userId) {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('author_id', userId)
      .eq('is_pinned', true)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
