/*
  # Portfolio Website Database Schema

  ## Overview
  This migration creates the core database structure for a portfolio website, including tables for projects, skills, experiences, and contact messages.

  ## New Tables

  ### `projects`
  Portfolio projects showcase table
  - `id` (uuid, primary key) - Unique project identifier
  - `title` (text) - Project title
  - `description` (text) - Detailed project description
  - `short_description` (text) - Brief summary for card displays
  - `image_url` (text) - Main project image URL
  - `demo_url` (text, nullable) - Live demo link
  - `github_url` (text, nullable) - GitHub repository link
  - `technologies` (text array) - Technologies used in the project
  - `featured` (boolean) - Whether to feature on homepage
  - `display_order` (integer) - Order for displaying projects
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `skills`
  Skills and technologies proficiency table
  - `id` (uuid, primary key) - Unique skill identifier
  - `name` (text) - Skill or technology name
  - `category` (text) - Category (e.g., frontend, backend, tools)
  - `proficiency_level` (integer) - Skill level 1-5
  - `icon_url` (text, nullable) - Icon or logo URL
  - `display_order` (integer) - Order for displaying skills
  - `created_at` (timestamptz) - Record creation timestamp

  ### `experiences`
  Work experience and education history
  - `id` (uuid, primary key) - Unique experience identifier
  - `title` (text) - Job title or degree
  - `company` (text) - Company or institution name
  - `location` (text, nullable) - Work/study location
  - `start_date` (date) - Start date
  - `end_date` (date, nullable) - End date (null for current)
  - `description` (text) - Role description and achievements
  - `type` (text) - Type: work, education, or volunteer
  - `display_order` (integer) - Order for displaying experiences
  - `created_at` (timestamptz) - Record creation timestamp

  ### `contact_messages`
  Contact form submissions
  - `id` (uuid, primary key) - Unique message identifier
  - `name` (text) - Sender name
  - `email` (text) - Sender email
  - `subject` (text) - Message subject
  - `message` (text) - Message content
  - `is_read` (boolean) - Whether message has been read
  - `created_at` (timestamptz) - Message timestamp

  ### `site_settings`
  Global site configuration and content
  - `id` (uuid, primary key) - Unique settings identifier
  - `key` (text, unique) - Settings key
  - `value` (jsonb) - Settings value as JSON
  - `description` (text, nullable) - Settings description
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security

  ### Row Level Security (RLS)
  - All tables have RLS enabled
  - Public read access for projects, skills, experiences (display data)
  - Authenticated-only write access for content management
  - Contact messages: public insert, authenticated read

  ### RLS Policies

  #### projects table
  - Anyone can view published projects
  - Only authenticated users can create, update, or delete projects

  #### skills table
  - Anyone can view skills
  - Only authenticated users can manage skills

  #### experiences table
  - Anyone can view experiences
  - Only authenticated users can manage experiences

  #### contact_messages table
  - Anyone can submit contact messages
  - Only authenticated users can view messages

  #### site_settings table
  - Anyone can read site settings
  - Only authenticated users can update settings

  ## Notes
  1. All tables use UUID primary keys for security and scalability
  2. Timestamps use timestamptz for timezone awareness
  3. Display order fields allow flexible content arrangement
  4. RLS ensures data security while allowing public viewing
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  short_description text NOT NULL,
  image_url text NOT NULL,
  demo_url text,
  github_url text,
  technologies text[] DEFAULT '{}',
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  proficiency_level integer DEFAULT 3 CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  icon_url text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  company text NOT NULL,
  location text,
  start_date date NOT NULL,
  end_date date,
  description text NOT NULL,
  type text NOT NULL CHECK (type IN ('work', 'education', 'volunteer')),
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for projects table
CREATE POLICY "Anyone can view projects"
  ON projects FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for skills table
CREATE POLICY "Anyone can view skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert skills"
  ON skills FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update skills"
  ON skills FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete skills"
  ON skills FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for experiences table
CREATE POLICY "Anyone can view experiences"
  ON experiences FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert experiences"
  ON experiences FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update experiences"
  ON experiences FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete experiences"
  ON experiences FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for contact_messages table
CREATE POLICY "Anyone can submit contact messages"
  ON contact_messages FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contact messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contact messages"
  ON contact_messages FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete contact messages"
  ON contact_messages FOR DELETE
  TO authenticated
  USING (true);

-- RLS Policies for site_settings table
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete site settings"
  ON site_settings FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured, display_order);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_skills_category ON skills(category, display_order);
CREATE INDEX IF NOT EXISTS idx_experiences_type ON experiences(type, display_order);
CREATE INDEX IF NOT EXISTS idx_experiences_dates ON experiences(start_date DESC, end_date DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX IF NOT EXISTS idx_site_settings_key ON site_settings(key);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at columns
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_site_settings_updated_at ON site_settings;
CREATE TRIGGER update_site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();