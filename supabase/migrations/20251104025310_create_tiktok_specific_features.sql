/*
  # TikTok-Specific Features

  ## Overview
  Advanced video features specific to TikTok: duets, stitches, effects, sounds, trends, and algorithmic feeds.

  ## New Tables

  ### `sounds`
  Audio/music library for videos
  - `id` (uuid, primary key)
  - `title` (text) - Sound name
  - `audio_url` (text) - Audio file URL
  - `duration` (integer) - Audio length in seconds
  - `original_creator_id` (uuid) - Creator of original sound
  - `use_count` (integer) - Times used in videos
  - `trending_score` (float) - Trending ranking
  - `is_featured` (boolean) - Featured sound flag
  - `created_at` (timestamptz)

  ### `video_sounds`
  Mapping of sounds used in videos
  - `id` (uuid, primary key)
  - `video_id` (uuid, foreign key)
  - `sound_id` (uuid, foreign key)
  - `sound_start` (integer) - Start time in seconds
  - `created_at` (timestamptz)

  ### `duets`
  Duet video references
  - `id` (uuid, primary key)
  - `duet_video_id` (uuid, foreign key) - The duet response
  - `original_video_id` (uuid, foreign key) - Original video being dueted
  - `original_creator_id` (uuid, foreign key)
  - `created_at` (timestamptz)

  ### `stitches`
  Stitch video references
  - `id` (uuid, primary key)
  - `stitch_video_id` (uuid, foreign key) - New video using stitch
  - `original_video_id` (uuid, foreign key) - Source video
  - `original_creator_id` (uuid, foreign key)
  - `stitch_segment_url` (text) - URL of stitched clip
  - `created_at` (timestamptz)

  ### `video_effects`
  Video effects and filters used
  - `id` (uuid, primary key)
  - `video_id` (uuid, foreign key)
  - `effect_name` (text) - Effect/filter name
  - `effect_type` (text) - filter, transition, face_effect, text_effect
  - `effect_parameters` (jsonb) - Effect configuration
  - `created_at` (timestamptz)

  ### `hashtag_videos`
  Video hashtag associations
  - `id` (uuid, primary key)
  - `video_id` (uuid, foreign key)
  - `hashtag` (text) - Hashtag without #
  - `created_at` (timestamptz)

  ### `trending_hashtags`
  Trending hashtag tracking
  - `id` (uuid, primary key)
  - `hashtag` (text, unique) - Hashtag name
  - `usage_count` (integer) - Times used
  - `trending_rank` (integer) - Current rank
  - `trending_score` (float) - Score calculation
  - `last_updated_at` (timestamptz)
  - `created_at` (timestamptz)

  ### `video_recommendations`
  Personalized video recommendations
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key)
  - `video_id` (uuid, foreign key)
  - `recommendation_reason` (text) - why_recommended
  - `score` (float) - Recommendation score
  - `position_in_feed` (integer) - Position in For You feed
  - `created_at` (timestamptz)

  ### `video_engagement_analytics`
  Detailed engagement metrics
  - `id` (uuid, primary key)
  - `video_id` (uuid, foreign key)
  - `watch_count` (integer) - Full watches
  - `partial_watch_count` (integer) - Partial watches
  - `average_watch_duration` (float) - Average seconds watched
  - `rewatch_count` (integer) - Times rewatched
  - `share_count_increment` (integer) - Daily share increment
  - `completion_rate` (float) - Percentage watched on average
  - `date` (date) - Analytics date
  - `created_at` (timestamptz)

  ## Security
  - RLS on sounds: anyone can read, creators can manage
  - RLS on duets/stitches: public, creator can manage
  - RLS on video_effects: based on parent video
  - Analytics visible to video owner
*/

-- Create sounds table
CREATE TABLE IF NOT EXISTS sounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  audio_url text NOT NULL,
  duration integer NOT NULL,
  original_creator_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  use_count integer DEFAULT 0,
  trending_score float DEFAULT 0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create video_sounds table
CREATE TABLE IF NOT EXISTS video_sounds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  sound_id uuid NOT NULL REFERENCES sounds(id) ON DELETE CASCADE,
  sound_start integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create duets table
CREATE TABLE IF NOT EXISTS duets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  duet_video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  original_video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  original_creator_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(duet_video_id, original_video_id)
);

-- Create stitches table
CREATE TABLE IF NOT EXISTS stitches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stitch_video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  original_video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  original_creator_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  stitch_segment_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(stitch_video_id, original_video_id)
);

-- Create video_effects table
CREATE TABLE IF NOT EXISTS video_effects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  effect_name text NOT NULL,
  effect_type text NOT NULL CHECK (effect_type IN ('filter', 'transition', 'face_effect', 'text_effect')),
  effect_parameters jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create hashtag_videos table
CREATE TABLE IF NOT EXISTS hashtag_videos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  hashtag text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(video_id, hashtag)
);

-- Create trending_hashtags table
CREATE TABLE IF NOT EXISTS trending_hashtags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hashtag text UNIQUE NOT NULL,
  usage_count integer DEFAULT 0,
  trending_rank integer,
  trending_score float DEFAULT 0,
  last_updated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create video_recommendations table
CREATE TABLE IF NOT EXISTS video_recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  recommendation_reason text NOT NULL,
  score float NOT NULL,
  position_in_feed integer,
  created_at timestamptz DEFAULT now()
);

-- Create video_engagement_analytics table
CREATE TABLE IF NOT EXISTS video_engagement_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id uuid NOT NULL REFERENCES videos(id) ON DELETE CASCADE,
  watch_count integer DEFAULT 0,
  partial_watch_count integer DEFAULT 0,
  average_watch_duration float DEFAULT 0,
  rewatch_count integer DEFAULT 0,
  share_count_increment integer DEFAULT 0,
  completion_rate float DEFAULT 0,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(video_id, date)
);

-- Enable Row Level Security
ALTER TABLE sounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_sounds ENABLE ROW LEVEL SECURITY;
ALTER TABLE duets ENABLE ROW LEVEL SECURITY;
ALTER TABLE stitches ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_effects ENABLE ROW LEVEL SECURITY;
ALTER TABLE hashtag_videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE trending_hashtags ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_engagement_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for sounds
CREATE POLICY "Anyone can view sounds"
  ON sounds FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert sounds"
  ON sounds FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Original creators can update sounds"
  ON sounds FOR UPDATE
  TO authenticated
  USING (original_creator_id = auth.uid())
  WITH CHECK (original_creator_id = auth.uid());

-- RLS Policies for video_sounds
CREATE POLICY "Anyone can view video sounds"
  ON video_sounds FOR SELECT
  USING (true);

CREATE POLICY "Video owners can add sounds"
  ON video_sounds FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_sounds.video_id
      AND videos.author_id = auth.uid()
    )
  );

-- RLS Policies for duets
CREATE POLICY "Anyone can view duets"
  ON duets FOR SELECT
  USING (true);

CREATE POLICY "Users can create duets"
  ON duets FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for stitches
CREATE POLICY "Anyone can view stitches"
  ON stitches FOR SELECT
  USING (true);

CREATE POLICY "Users can create stitches"
  ON stitches FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for video_effects
CREATE POLICY "Anyone can view video effects"
  ON video_effects FOR SELECT
  USING (true);

CREATE POLICY "Video owners can add effects"
  ON video_effects FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_effects.video_id
      AND videos.author_id = auth.uid()
    )
  );

-- RLS Policies for hashtag_videos
CREATE POLICY "Anyone can view hashtag videos"
  ON hashtag_videos FOR SELECT
  USING (true);

CREATE POLICY "Video owners can tag videos"
  ON hashtag_videos FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = hashtag_videos.video_id
      AND videos.author_id = auth.uid()
    )
  );

-- RLS Policies for trending_hashtags
CREATE POLICY "Anyone can view trending hashtags"
  ON trending_hashtags FOR SELECT
  USING (true);

-- RLS Policies for video_recommendations
CREATE POLICY "Users can view own recommendations"
  ON video_recommendations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can create recommendations"
  ON video_recommendations FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for video_engagement_analytics
CREATE POLICY "Video owners can view analytics"
  ON video_engagement_analytics FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM videos
      WHERE videos.id = video_engagement_analytics.video_id
      AND videos.author_id = auth.uid()
    )
  );

CREATE POLICY "System can insert analytics"
  ON video_engagement_analytics FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_sounds_original_creator_id ON sounds(original_creator_id);
CREATE INDEX IF NOT EXISTS idx_sounds_trending_score ON sounds(trending_score DESC);
CREATE INDEX IF NOT EXISTS idx_video_sounds_video_id ON video_sounds(video_id);
CREATE INDEX IF NOT EXISTS idx_video_sounds_sound_id ON video_sounds(sound_id);
CREATE INDEX IF NOT EXISTS idx_duets_original_video_id ON duets(original_video_id);
CREATE INDEX IF NOT EXISTS idx_duets_original_creator_id ON duets(original_creator_id);
CREATE INDEX IF NOT EXISTS idx_stitches_original_video_id ON stitches(original_video_id);
CREATE INDEX IF NOT EXISTS idx_stitches_original_creator_id ON stitches(original_creator_id);
CREATE INDEX IF NOT EXISTS idx_video_effects_video_id ON video_effects(video_id);
CREATE INDEX IF NOT EXISTS idx_hashtag_videos_video_id ON hashtag_videos(video_id);
CREATE INDEX IF NOT EXISTS idx_hashtag_videos_hashtag ON hashtag_videos(hashtag);
CREATE INDEX IF NOT EXISTS idx_trending_hashtags_trending_rank ON trending_hashtags(trending_rank);
CREATE INDEX IF NOT EXISTS idx_trending_hashtags_hashtag ON trending_hashtags(hashtag);
CREATE INDEX IF NOT EXISTS idx_video_recommendations_user_id ON video_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_video_recommendations_video_id ON video_recommendations(video_id);
CREATE INDEX IF NOT EXISTS idx_video_engagement_analytics_video_id ON video_engagement_analytics(video_id);
CREATE INDEX IF NOT EXISTS idx_video_engagement_analytics_date ON video_engagement_analytics(date DESC);