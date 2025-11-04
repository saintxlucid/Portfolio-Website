import { supabase } from '../config/supabase.js';

export const notificationService = {
  async createNotification(recipientId, actorId, notificationType, relatedObjectId = null, relatedObjectType = null) {
    const { data, error } = await supabase
      .from('notifications')
      .insert([{
        recipient_id: recipientId,
        actor_id: actorId,
        notification_type: notificationType,
        related_object_id: relatedObjectId,
        related_object_type: relatedObjectType
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getNotifications(userId, limit = 20, offset = 0) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*, actor:profiles!notifications_actor_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('recipient_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data;
  },

  async getUnreadNotifications(userId) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*, actor:profiles!notifications_actor_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('recipient_id', userId)
      .eq('is_read', false)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async markAsRead(notificationId) {
    const { data, error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markAllAsRead(userId) {
    const { error } = await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('recipient_id', userId);

    if (error) throw error;
    return { success: true };
  },

  async deleteNotification(notificationId) {
    const { error } = await supabase
      .from('notifications')
      .delete()
      .eq('id', notificationId);

    if (error) throw error;
    return { success: true };
  },

  async getUnreadCount(userId) {
    const { count, error } = await supabase
      .from('notifications')
      .select('id', { count: 'exact' })
      .eq('recipient_id', userId)
      .eq('is_read', false);

    if (error) throw error;
    return count;
  },

  async notifyLike(recipientId, actorId, targetId, targetType) {
    return this.createNotification(recipientId, actorId, 'like', targetId, targetType);
  },

  async notifyComment(recipientId, actorId, commentId, postId) {
    return this.createNotification(recipientId, actorId, 'comment', commentId, 'comment');
  },

  async notifyFollow(recipientId, actorId) {
    return this.createNotification(recipientId, actorId, 'follow', actorId, 'profile');
  },

  async notifyMention(recipientId, actorId, postId, postType) {
    return this.createNotification(recipientId, actorId, 'mention', postId, postType);
  },

  async notifyShare(recipientId, actorId, contentId, contentType) {
    return this.createNotification(recipientId, actorId, 'share', contentId, contentType);
  },

  async notifyMessage(recipientId, actorId, messageId) {
    return this.createNotification(recipientId, actorId, 'message', messageId, 'message');
  },

  async getUserSettings(userId) {
    const { data, error } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async updateUserSettings(userId, settings) {
    const { data, error } = await supabase
      .from('user_settings')
      .upsert([{ user_id: userId, ...settings }], { onConflict: 'user_id' })
      .select()
      .single();

    if (error) throw error;
    return data;
  }
};
