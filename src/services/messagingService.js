import { supabase } from '../config/supabase.js';

export const messagingService = {
  async createConversation(participants, isGroup = false, groupName = null) {
    const { data, error } = await supabase
      .from('conversations')
      .insert([{
        participants,
        is_group: isGroup,
        group_name: groupName
      }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getConversations(userId) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .contains('participants', [userId])
      .order('last_message_at', { ascending: false, nullsFirst: false });

    if (error) throw error;
    return data;
  },

  async getConversationById(conversationId) {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', conversationId)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async sendMessage(conversationId, senderId, content, mediaUrls = []) {
    const { data, error } = await supabase
      .from('messages')
      .insert([{
        conversation_id: conversationId,
        sender_id: senderId,
        content,
        media_urls: mediaUrls
      }])
      .select()
      .single();

    if (error) throw error;

    await supabase
      .from('conversations')
      .update({
        last_message_id: data.id,
        last_message_at: new Date().toISOString()
      })
      .eq('id', conversationId);

    return data;
  },

  async getMessages(conversationId, limit = 50, offset = 0) {
    const { data, error } = await supabase
      .from('messages')
      .select('*, sender:profiles!messages_sender_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('conversation_id', conversationId)
      .eq('is_deleted', false)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw error;
    return data.reverse();
  },

  async editMessage(messageId, newContent) {
    const { data, error } = await supabase
      .from('messages')
      .update({
        content: newContent,
        edited_at: new Date().toISOString()
      })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteMessage(messageId) {
    const { data, error } = await supabase
      .from('messages')
      .update({ is_deleted: true })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markAsRead(messageId, userId) {
    const { data, error } = await supabase
      .from('message_reads')
      .insert([{
        message_id: messageId,
        user_id: userId
      }])
      .select()
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async getReadReceipts(messageId) {
    const { data, error } = await supabase
      .from('message_reads')
      .select('user_id, read_at, profile:profiles!message_reads_user_id_fkey(id, username, display_name, profile_picture_url)')
      .eq('message_id', messageId);

    if (error) throw error;
    return data;
  },

  async addEmojiReaction(messageId, emoji) {
    const { data, error } = await supabase
      .from('messages')
      .update({ emoji_reaction: emoji })
      .eq('id', messageId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async searchConversations(userId, query) {
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('*')
      .contains('participants', [userId]);

    if (error) throw error;

    return conversations.filter(conv => {
      if (conv.is_group) {
        return conv.group_name?.toLowerCase().includes(query.toLowerCase());
      }
      return conv.participants.some(id => id !== userId);
    });
  },

  async getUnreadCount(userId) {
    const { data, error } = await supabase
      .from('messages')
      .select('conversation_id', { count: 'exact' })
      .eq('is_deleted', false)
      .not('message_reads', 'is', null);

    if (error) throw error;
    return data;
  }
};
