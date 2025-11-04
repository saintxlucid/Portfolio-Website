/*
  # Messaging and Notifications System

  ## Overview
  Direct messaging, notifications, and real-time features for the social media platform.

  ## New Tables

  ### `conversations`
  Direct message conversations (threads)
  - `id` (uuid, primary key)
  - `participants` (uuid array) - Users in conversation
  - `is_group` (boolean) - Group chat flag
  - `group_name` (text) - Group chat name if applicable
  - `group_image_url` (text) - Group chat avatar
  - `last_message_id` (uuid) - Most recent message
  - `last_message_at` (timestamptz) - Last activity timestamp
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `messages`
  Individual messages in conversations
  - `id` (uuid, primary key)
  - `conversation_id` (uuid, foreign key)
  - `sender_id` (uuid, foreign key)
  - `content` (text) - Message text
  - `media_urls` (text array) - Attached images/videos
  - `emoji_reaction` (text) - Emoji reaction to another message
  - `is_deleted` (boolean) - Soft delete flag
  - `edited_at` (timestamptz)
  - `created_at` (timestamptz)

  ### `message_reads`
  Track when users read messages
  - `id` (uuid, primary key)
  - `message_id` (uuid, foreign key)
  - `user_id` (uuid, foreign key)
  - `read_at` (timestamptz)

  ### `notifications`
  Activity notifications
  - `id` (uuid, primary key)
  - `recipient_id` (uuid, foreign key)
  - `actor_id` (uuid, foreign key) - User triggering notification
  - `notification_type` (text) - like, comment, follow, mention, etc.
  - `related_object_id` (uuid) - Post, comment, etc. being referenced
  - `related_object_type` (text) - post, video, comment, profile
  - `is_read` (boolean)
  - `created_at` (timestamptz)

  ### `user_settings`
  User preferences and settings
  - `id` (uuid, primary key)
  - `user_id` (uuid, unique, foreign key)
  - `notifications_enabled` (boolean)
  - `email_notifications` (boolean)
  - `push_notifications` (boolean)
  - `allow_messages_from` (text) - anyone, followers, nobody
  - `activity_status_visible` (boolean)
  - `last_seen_visible` (boolean)
  - `search_visibility` (text) - public, private
  - `updated_at` (timestamptz)

  ### `reports`
  Content and user reporting system
  - `id` (uuid, primary key)
  - `reporter_id` (uuid, foreign key)
  - `reported_user_id` (uuid, foreign key, nullable)
  - `reported_content_id` (uuid, nullable)
  - `reported_content_type` (text) - post, video, comment, profile, message
  - `reason` (text) - Report reason
  - `description` (text) - Detailed report
  - `status` (text) - pending, reviewing, resolved, dismissed
  - `resolution_notes` (text)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS on conversations only for participants
  - RLS on messages only for conversation participants
  - RLS on notifications only for recipient
  - RLS on user_settings only for owner
  - RLS on reports to prevent viewing others' reports
*/

-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participants uuid[] NOT NULL,
  is_group boolean DEFAULT false,
  group_name text,
  group_image_url text,
  last_message_id uuid,
  last_message_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id uuid NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  media_urls text[] DEFAULT '{}',
  emoji_reaction text,
  is_deleted boolean DEFAULT false,
  edited_at timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Create message_reads table
CREATE TABLE IF NOT EXISTS message_reads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  message_id uuid NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  read_at timestamptz DEFAULT now(),
  UNIQUE(message_id, user_id)
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recipient_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  actor_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notification_type text NOT NULL CHECK (notification_type IN ('like', 'comment', 'follow', 'mention', 'share', 'message', 'reply')),
  related_object_id uuid,
  related_object_type text CHECK (related_object_type IN ('post', 'video', 'comment', 'profile', 'story')),
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create user_settings table
CREATE TABLE IF NOT EXISTS user_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  notifications_enabled boolean DEFAULT true,
  email_notifications boolean DEFAULT true,
  push_notifications boolean DEFAULT true,
  allow_messages_from text NOT NULL DEFAULT 'followers' CHECK (allow_messages_from IN ('anyone', 'followers', 'nobody')),
  activity_status_visible boolean DEFAULT true,
  last_seen_visible boolean DEFAULT true,
  search_visibility text NOT NULL DEFAULT 'public' CHECK (search_visibility IN ('public', 'private')),
  updated_at timestamptz DEFAULT now()
);

-- Create reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_user_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  reported_content_id uuid,
  reported_content_type text CHECK (reported_content_type IN ('post', 'video', 'comment', 'profile', 'message')),
  reason text NOT NULL,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'resolved', 'dismissed')),
  resolution_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE message_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Users can view conversations they are in"
  ON conversations FOR SELECT
  TO authenticated
  USING (auth.uid() = ANY(participants));

CREATE POLICY "Users can create conversations"
  ON conversations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = ANY(participants));

CREATE POLICY "Participants can update conversations"
  ON conversations FOR UPDATE
  TO authenticated
  USING (auth.uid() = ANY(participants))
  WITH CHECK (auth.uid() = ANY(participants));

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = messages.conversation_id
      AND auth.uid() = ANY(conversations.participants)
    )
  );

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    sender_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM conversations
      WHERE conversations.id = conversation_id
      AND auth.uid() = ANY(conversations.participants)
    )
  );

CREATE POLICY "Users can edit own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (sender_id = auth.uid())
  WITH CHECK (sender_id = auth.uid());

CREATE POLICY "Users can delete own messages"
  ON messages FOR DELETE
  TO authenticated
  USING (sender_id = auth.uid());

-- RLS Policies for message_reads
CREATE POLICY "Users can view read receipts in their conversations"
  ON message_reads FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM messages
      JOIN conversations ON messages.conversation_id = conversations.id
      WHERE messages.id = message_reads.message_id
      AND auth.uid() = ANY(conversations.participants)
    )
  );

CREATE POLICY "Users can mark messages as read"
  ON message_reads FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for notifications
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (recipient_id = auth.uid());

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (recipient_id = auth.uid())
  WITH CHECK (recipient_id = auth.uid());

CREATE POLICY "Users can delete own notifications"
  ON notifications FOR DELETE
  TO authenticated
  USING (recipient_id = auth.uid());

-- RLS Policies for user_settings
CREATE POLICY "Users can view own settings"
  ON user_settings FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own settings"
  ON user_settings FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can insert own settings"
  ON user_settings FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for reports
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (reporter_id = auth.uid());

CREATE POLICY "Users can create reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (reporter_id = auth.uid());

CREATE POLICY "Moderators can view all reports"
  ON reports FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_settings
      WHERE user_id = auth.uid()
    )
  );

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_participants ON conversations USING GIN(participants);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_message_reads_message_id ON message_reads(message_id);
CREATE INDEX IF NOT EXISTS idx_message_reads_user_id ON message_reads(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_recipient_id ON notifications(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_user_settings_user_id ON user_settings(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_reporter_id ON reports(reporter_id);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

-- Create trigger for updated_at
CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();