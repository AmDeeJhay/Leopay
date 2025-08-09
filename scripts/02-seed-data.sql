-- This file is no longer needed since we're using mock data
-- Keeping for reference but not used in the application

-- Insert sample profiles (mock equivalent)
INSERT INTO profiles (
  id, email, full_name, bio, location, skills, hourly_rate, 
  experience_level, portfolio_url, linkedin_url, github_url,
  role, subrole, kyc_verified, profile_completed,
  total_earnings, projects_completed, client_rating
) VALUES 
(
  'demo-user-1', 'demo@leopay.app', 'Alex Johnson',
  'Full-stack developer with 5+ years of experience in React, Node.js, and blockchain technologies.',
  'San Francisco, CA', ARRAY['JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Blockchain'],
  85, 'senior', 'https://alexjohnson.dev', 'https://linkedin.com/in/alexjohnson', 'https://github.com/alexjohnson',
  'freelancer', 'receiver', true, true, 45000, 28, 4.9
);

-- Note: This SQL is for reference only. The application now uses mock data.
