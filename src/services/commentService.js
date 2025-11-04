import { supabase } from '../config/supabase.js';

export const commentService = {
  async createComment(commentData) {
    const { data, error } = await supabase
      .from('comments')
      .insert([commentData])
      .select()
      .single();

    if (error) throw error;

    const targetType = commentData.parent_type;
    const updateField = `${targetType === 'post' ? 'posts' : 'videos'}.comment_count`;

    await supabase.rpc('increment_comment_count', {
      target_id: commentData.parent_id,
      target_type: commentData.parent_type
    }).catch(() => {});

    return data;
  },

  async getComments(parentId, parentType, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, author:profiles!comments_author_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('parent_id', parentId)
      .eq('parent_type', parentType)
      .is('reply_to_comment_id', null)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getReplies(commentId, limit = 10) {
    const { data, error } = await supabase
      .from('comments')
      .select('*, author:profiles!comments_author_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('reply_to_comment_id', commentId)
      .order('created_at', { ascending: true })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  async updateComment(id, updates) {
    const { data, error } = await supabase
      .from('comments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteComment(id) {
    const comment = await this.getCommentById(id);

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    await supabase.rpc('decrement_comment_count', {
      target_id: comment.parent_id,
      target_type: comment.parent_type
    }).catch(() => {});

    return { success: true };
  },

  async getCommentById(id) {
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async likeComment(userId, commentId) {
    const { data, error } = await supabase
      .from('likes')
      .insert([{ user_id: userId, target_id: commentId, target_type: 'comment' }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('comments')
      .update({ like_count: supabase.raw('like_count + 1') })
      .eq('id', commentId);

    return data;
  },

  async unlikeComment(userId, commentId) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('user_id', userId)
      .eq('target_id', commentId)
      .eq('target_type', 'comment');

    if (error) throw error;

    await supabase
      .from('comments')
      .update({ like_count: supabase.raw('GREATEST(like_count - 1, 0)') })
      .eq('id', commentId);

    return { success: true };
  }
};
