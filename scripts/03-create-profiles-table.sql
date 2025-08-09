-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  bio TEXT,
  location TEXT,
  skills TEXT[],
  hourly_rate DECIMAL(10,2),
  experience_level TEXT CHECK (experience_level IN ('entry', 'intermediate', 'senior', 'expert')),
  portfolio_url TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  role TEXT CHECK (role IN ('freelancer', 'contractor', 'employer', 'dao', 'employee')),
  user_type TEXT,
  profile_completed BOOLEAN DEFAULT FALSE,
  kyc_verified BOOLEAN DEFAULT FALSE,
  avatar_url TEXT,
  phone_number TEXT,
  document_type TEXT,
  document_number TEXT,
  address TEXT,
  city TEXT,
  country TEXT,
  postal_code TEXT,
  kyc_submitted_at TIMESTAMPTZ,
  total_earnings DECIMAL(10,2) DEFAULT 0,
  projects_completed INTEGER DEFAULT 0,
  client_rating DECIMAL(3,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION handle_updated_at();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();
