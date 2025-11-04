/*
  # Social Media Platform - Core Tables

  ## Overview
  Core infrastructure for a comprehensive social media platform combining TikTok, Instagram, and Threads features with Facebook pre-2020 backend architecture.

  ## New Tables

  ### `profiles`
  User profile data and public information
  - `id` (uuid, primary key) - User unique identifier
  - `username` (text, unique) - Username handle
  - `email` (text, unique) - Email address
  - `display_name` (text) - Full name displayed on profile
  - `bio` (text) - User biography
  - `profile_picture_url` (text) - Profile image
  - `cover_photo_url` (text) - Cover/header image
  - `website` (text) - External website link
  - `location` (text) - User location
  - `is_verified` (boolean) - Account verification status
  - `is_private` (boolean) - Private account flag
  - `follower_count` (integer) - Cached follower count
  - `following_count` (integer) - Cached following count
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last profile update

  ### `followers`
  Social graph - follower/following relationships
  - `id` (uuid, primary key)
  - `follower_id` (uuid, foreign key) - User doing the following
  - `following_id` (uuid, foreign key) - User being followed
  - `created_at` (timestamptz) - When relationship was created
  - Unique constraint on (follower_id, following_id)

  ### `blocks`
  User blocking relationships
  - `id` (uuid, primary key)
  - `blocker_id` (uuid, foreign key) - User initiating block
  - `blocked_id` (uuid, foreign key) - User being blocked
  - `created_at` (timestamptz)
  - Unique constraint on (blocker_id, blocked_id)

  ### `posts`
  Standard posts, photos, and status updates
  - `id` (uuid, primary key)
  - `author_id` (uuid, foreign key) - Post creator
  - `content` (text) - Post text content
  - `post_type` (text) - Type: text, photo, link, carousel
  - `visibility` (text) - Public, friends, private, custom
  - `image_urls` (text array) - Associated images
  - `video_url` (text) - Optional video
  - `link_preview_url` (text) - Link thumbnail
  - `link_url` (text) - Shared link
  - `location` (text) - Geo-tagged location
  - `edited_at` (timestamptz) - When last edited
  - `is_pinned` (boolean) - Pinned on profile
  - `engagement_count` (integer) - Cached engagement count
  - `share_count` (integer) - Cached share count
  - `comment_count` (integer) - Cached comment count
  - `like_count` (integer) - Cached like count
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `stories`
  Instagram/Threads-style ephemeral stories
  - `id` (uuid, primary key)
  - `author_id` (uuid, foreign key)
  - `content` (text) - Story text
  - `media_url` (text) - Story image/video
  - `story_type` (text) - image, video, text
  - `sticker_data` (jsonb) - Interactive stickers, polls, questions
  - `view_count` (integer) - Number of views
  - `expires_at` (timestamptz) - 24-hour expiration
  - `created_at` (timestamptz)

  ### `videos`
  TikTok-style short-form videos
  - `id` (uuid, primary key)
  - `author_id` (uuid, foreign key)
  - `title` (text) - Video title
  - `description` (text) - Video description
  - `video_url` (text) - Video file URL
  - `thumbnail_url` (text) - Thumbnail image
  - `duration` (integer) - Video duration in seconds
  - `view_count` (integer) - View counter
  - `like_count` (integer) - Like counter
  - `comment_count` (integer) - Comment counter
  - `share_count` (integer) - Share counter
  - `hashtags` (text array) - Associated hashtags
  - `trending_score` (float) - Algorithmic trending score
  - `is_for_you_feed` (boolean) - Eligible for For You page
  - `visibility` (text) - Public, private, friends
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `comments`
  Comments on posts and videos
  - `id` (uuid, primary key)
  - `author_id` (uuid, foreign key) - Comment author
  - `parent_id` (uuid, foreign key) - Parent post or video
  - `parent_type` (text) - post, video, story
  - `content` (text) - Comment text
  - `reply_to_comment_id` (uuid) - Nested reply to another comment
  - `like_count` (integer) - Cached like count
  - `reply_count` (integer) - Cached reply count
  - `edited_at` (timestamptz)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `likes`
  Engagement tracking for likes
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `target_id` (uuid, foreign key) - Post, video, comment, story
  - `target_type` (text) - post, video, comment, story
  - `created_at` (timestamptz)
  - Unique constraint on (user_id, target_id, target_type)

  ### `shares`
  Share tracking
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key) - User sharing
  - `content_id` (uuid, foreign key) - Shared content
  - `content_type` (text) - post, video, story
  - `shared_via` (text) - dm, profile, story, external
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public profiles visible to authenticated users
  - Posts visible based on privacy settings and follower status
  - Private data (DMs, followers) only accessible to owner
  - Comments visible with parent content
  - Engagement actions (likes) only by authenticated users

  ## Performance Indexes
  - Index on author_id for profile feeds
  - Index on created_at for chronological feeds
  - Index on follower/following pairs
  - Index on visibility for feed queries
  - Index on trending_score for algorithmic feeds
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  display_name text NOT NULL,
  bio text DEFAULT '',
  profile_picture_url text,
  cover_photo_url text,
  website text,
  location text,
  is_verified boolean DEFAULT false,
  is_private boolean DEFAULT false,
  follower_count integer DEFAULT 0,
  following_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create followers table
CREATE TABLE IF NOT EXISTS followers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  follower_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  following_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Create blocks table
CREATE TABLE IF NOT EXISTS blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocker_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(blocker_id, blocked_id),
  CHECK (blocker_id != blocked_id)
);

-- Create posts table
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  post_type text NOT NULL DEFAULT 'text' CHECK (post_type IN ('text', 'photo', 'link', 'carousel')),
  visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'friends', 'private', 'custom')),
  image_urls text[] DEFAULT '{}',
  video_url text,
  link_preview_url text,
  link_url text,
  location text,
  edited_at timestamptz,
  is_pinned boolean DEFAULT false,
  engagement_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create stories table
CREATE TABLE IF NOT EXISTS stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content text,
  media_url text NOT NULL,
  story_type text NOT NULL DEFAULT 'image' CHECK (story_type IN ('image', 'video', 'text')),
  sticker_data jsonb,
  view_count integer DEFAULT 0,
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create videos table (TikTok-style)
CREATE TABLE IF NOT EXISTS videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  video_url text NOT NULL,
  thumbnail_url text,
  duration integer NOT NULL,
  view_count integer DEFAULT 0,
  like_count integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  share_count integer DEFAULT 0,
  hashtags text[] DEFAULT '{}',
  trending_score float DEFAULT 0,
  is_for_you_feed boolean DEFAULT true,
  visibility text NOT NULL DEFAULT 'public' CHECK (visibility IN ('public', 'private', 'friends')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create comments table
CREATE TABLE IF NOT EXISTS comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  parent_id uuid NOT NULL,
  parent_type text NOT NULL CHECK (parent_type IN ('post', 'video', 'story')),
  content text NOT NULL,
  reply_to_comment_id uuid REFERENCES comments(id) ON DELETE CASCADE,
  like_count integer DEFAULT 0,
  reply_count integer DEFAULT 0,
  edited_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create likes table
CREATE TABLE IF NOT EXISTS likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  target_id uuid NOT NULL,
  target_type text NOT NULL CHECK (target_type IN ('post', 'video', 'comment', 'story')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, target_id, target_type)
);

-- Create shares table
CREATE TABLE IF NOT EXISTS shares (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content_id uuid NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('post', 'video', 'story')),
  shared_via text NOT NULL DEFAULT 'profile' CHECK (shared_via IN ('dm', 'profile', 'story', 'external')),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE followers ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE shares ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles visible to authenticated users"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

-- RLS Policies for followers
CREATE POLICY "Anyone can view followers"
  ON followers FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can follow"
  ON followers FOR INSERT
  TO authenticated
  WITH CHECK (follower_id = auth.uid());

CREATE POLICY "Users can unfollow"
  ON followers FOR DELETE
  TO authenticated
  USING (follower_id = auth.uid());

-- RLS Policies for blocks
CREATE POLICY "Authenticated users can block"
  ON blocks FOR INSERT
  TO authenticated
  WITH CHECK (blocker_id = auth.uid());

CREATE POLICY "Users can manage own blocks"
  ON blocks FOR DELETE
  TO authenticated
  USING (blocker_id = auth.uid());

CREATE POLICY "Users can view own blocks"
  ON blocks FOR SELECT
  TO authenticated
  USING (blocker_id = auth.uid());

-- RLS Policies for posts
CREATE POLICY "Public posts visible to all"
  ON posts FOR SELECT
  USING (visibility = 'public');

CREATE POLICY "Authenticated users see friends posts"
  ON posts FOR SELECT
  TO authenticated
  USING (
    visibility = 'public'
    OR author_id = auth.uid()
    OR (visibility = 'friends' AND EXISTS (
      SELECT 1 FROM followers
      WHERE follower_id = auth.uid() AND following_id = posts.author_id
    ))
  );

CREATE POLICY "Authenticated users can create posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- RLS Policies for stories
CREATE POLICY "Stories visible to followers"
  ON stories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM followers
      WHERE follower_id = auth.uid() AND following_id = stories.author_id
    )
    OR author_id = auth.uid()
  );

CREATE POLICY "Users can create stories"
  ON stories FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can delete own stories"
  ON stories FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- RLS Policies for videos
CREATE POLICY "Public videos visible to all"
  ON videos FOR SELECT
  USING (visibility = 'public');

CREATE POLICY "Authenticated users see friend videos"
  ON videos FOR SELECT
  TO authenticated
  USING (
    visibility = 'public'
    OR author_id = auth.uid()
    OR (visibility = 'friends' AND EXISTS (
      SELECT 1 FROM followers
      WHERE follower_id = auth.uid() AND following_id = videos.author_id
    ))
  );

CREATE POLICY "Authenticated users can upload videos"
  ON videos FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can update own videos"
  ON videos FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can delete own videos"
  ON videos FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- RLS Policies for comments
CREATE POLICY "Comments visible with parent content"
  ON comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can comment"
  ON comments FOR INSERT
  TO authenticated
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can edit own comments"
  ON comments FOR UPDATE
  TO authenticated
  USING (author_id = auth.uid())
  WITH CHECK (author_id = auth.uid());

CREATE POLICY "Users can delete own comments"
  ON comments FOR DELETE
  TO authenticated
  USING (author_id = auth.uid());

-- RLS Policies for likes
CREATE POLICY "Anyone can view likes"
  ON likes FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can like"
  ON likes FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unlike"
  ON likes FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for shares
CREATE POLICY "Anyone can view share stats"
  ON shares FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can share"
  ON shares FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_created_at ON profiles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_followers_follower_id ON followers(follower_id);
CREATE INDEX IF NOT EXISTS idx_followers_following_id ON followers(following_id);
CREATE INDEX IF NOT EXISTS idx_blocks_blocker_id ON blocks(blocker_id);
CREATE INDEX IF NOT EXISTS idx_posts_author_id ON posts(author_id);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_posts_visibility ON posts(visibility);
CREATE INDEX IF NOT EXISTS idx_stories_author_id ON stories(author_id);
CREATE INDEX IF NOT EXISTS idx_stories_expires_at ON stories(expires_at);
CREATE INDEX IF NOT EXISTS idx_videos_author_id ON videos(author_id);
CREATE INDEX IF NOT EXISTS idx_videos_trending_score ON videos(trending_score DESC);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_hashtags ON videos USING GIN(hashtags);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_author_id ON comments(author_id);
CREATE INDEX IF NOT EXISTS idx_likes_user_id ON likes(user_id);
CREATE INDEX IF NOT EXISTS idx_likes_target_id ON likes(target_id);
CREATE INDEX IF NOT EXISTS idx_shares_user_id ON shares(user_id);
CREATE INDEX IF NOT EXISTS idx_shares_content_id ON shares(content_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON videos
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at
  BEFORE UPDATE ON comments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();