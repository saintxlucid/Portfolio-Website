import { supabase } from '../config/supabase.js';

export const threadService = {
  async createThread(threadData) {
    const { data, error } = await supabase
      .from('threads')
      .insert([threadData])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getThreadById(id) {
    const { data, error } = await supabase
      .from('threads')
      .select('*, author:profiles!threads_author_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async getUserThreads(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('threads')
      .select('*, author:profiles!threads_author_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('author_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getThreadFeed(limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('threads')
      .select('*, author:profiles!threads_author_id_fkey(id, username, display_name, profile_picture_url)')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async updateThread(id, updates) {
    const { data, error } = await supabase
      .from('threads')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteThread(id) {
    const { error } = await supabase
      .from('threads')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  async replyToThread(threadId, authorId, content) {
    const { data, error } = await supabase
      .from('thread_posts')
      .insert([{
        thread_id: threadId,
        author_id: authorId,
        content
      }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('threads')
      .update({ reply_count: supabase.raw('reply_count + 1') })
      .eq('id', threadId);

    return data;
  },

  async getThreadReplies(threadId, limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('thread_posts')
      .select('*, author:profiles!thread_posts_author_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('thread_id', threadId)
      .is('reply_to_post_id', null)
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async replyToPost(threadId, postId, authorId, content) {
    const { data, error } = await supabase
      .from('thread_posts')
      .insert([{
        thread_id: threadId,
        author_id: authorId,
        content,
        reply_to_post_id: postId
      }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('thread_posts')
      .update({ reply_count: supabase.raw('reply_count + 1') })
      .eq('id', postId);

    return data;
  },

  async likeThread(userId, threadId) {
    const { data, error } = await supabase
      .from('thread_likes')
      .insert([{ user_id: userId, thread_id: threadId }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('threads')
      .update({ like_count: supabase.raw('like_count + 1') })
      .eq('id', threadId);

    return data;
  },

  async unlikeThread(userId, threadId) {
    const { error } = await supabase
      .from('thread_likes')
      .delete()
      .eq('user_id', userId)
      .eq('thread_id', threadId);

    if (error) throw error;

    await supabase
      .from('threads')
      .update({ like_count: supabase.raw('GREATEST(like_count - 1, 0)') })
      .eq('id', threadId);

    return { success: true };
  },

  async likePost(userId, postId) {
    const { data, error } = await supabase
      .from('thread_likes')
      .insert([{ user_id: userId, post_id: postId }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('thread_posts')
      .update({ like_count: supabase.raw('like_count + 1') })
      .eq('id', postId);

    return data;
  },

  async unlikePost(userId, postId) {
    const { error } = await supabase
      .from('thread_likes')
      .delete()
      .eq('user_id', userId)
      .eq('post_id', postId);

    if (error) throw error;

    await supabase
      .from('thread_posts')
      .update({ like_count: supabase.raw('GREATEST(like_count - 1, 0)') })
      .eq('id', postId);

    return { success: true };
  },

  async followThread(userId, threadId) {
    const { data, error } = await supabase
      .from('thread_follows')
      .insert([{ user_id: userId, thread_id: threadId }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async unfollowThread(userId, threadId) {
    const { error } = await supabase
      .from('thread_follows')
      .delete()
      .eq('user_id', userId)
      .eq('thread_id', threadId);

    if (error) throw error;
    return { success: true };
  },

  async addHashtag(threadId, hashtag) {
    const { data, error } = await supabase
      .from('hashtag_threads')
      .insert([{ thread_id: threadId, hashtag: hashtag.toLowerCase() }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getThreadsByHashtag(hashtag, limit = 20) {
    const { data, error } = await supabase
      .from('hashtag_threads')
      .select('thread:threads(*, author:profiles!threads_author_id_fkey(id, username, display_name, profile_picture_url))')
      .eq('hashtag', hashtag.toLowerCase())
      .limit(limit);

    if (error) throw error;
    return data;
  }
};
