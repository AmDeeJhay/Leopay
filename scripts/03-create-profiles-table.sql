-- This file is no longer needed since we're using mock data
-- Keeping for reference but not used in the application

-- Enhanced profiles table with all fields
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  bio TEXT,
  location TEXT,
  skills TEXT[] DEFAULT '{}',
  hourly_rate DECIMAL(10,2),
  experience_level TEXT CHECK (experience_level IN ('entry', 'intermediate', 'senior', 'expert')),
  portfolio_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  website TEXT,
  avatar_url TEXT,
  phone_number TEXT,
  role TEXT CHECK (role IN ('freelancer', 'contractor', 'employee', 'employer', 'dao')),
  subrole TEXT CHECK (subrole IN ('receiver', 'sender')),
  kyc_verified BOOLEAN DEFAULT FALSE,
  profile_completed BOOLEAN DEFAULT FALSE,
  total_earnings DECIMAL(12,2) DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  client_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Note: This SQL is for reference only. The application now uses mock data.
