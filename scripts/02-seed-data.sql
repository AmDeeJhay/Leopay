-- Insert sample skills for freelancers
INSERT INTO profiles (id, email, full_name, role, skills, experience_level, hourly_rate, kyc_verified, profile_completed)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'john@example.com', 'John Doe', 'freelancer', 
   ARRAY['Web Development', 'React', 'Node.js'], 'expert', 75.00, true, true),
  ('00000000-0000-0000-0000-000000000002', 'jane@example.com', 'Jane Smith', 'freelancer', 
   ARRAY['UI/UX Design', 'Figma', 'Adobe Creative Suite'], 'intermediate', 50.00, true, true),
  ('00000000-0000-0000-0000-000000000003', 'company@example.com', 'Tech Corp', 'employer', 
   NULL, NULL, NULL, false, true)
ON CONFLICT (id) DO NOTHING;

-- Insert sample tasks
INSERT INTO tasks (title, description, status, priority, assigned_to, created_by)
VALUES 
  ('Build Landing Page', 'Create a modern landing page for our product', 'pending', 'high', 
   '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000003'),
  ('Design Mobile App UI', 'Design user interface for mobile application', 'in_progress', 'medium', 
   '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;

-- Insert sample transactions
INSERT INTO transactions (amount, type, status, from_user, to_user, description)
VALUES 
  (1500.00, 'payment', 'completed', '00000000-0000-0000-0000-000000000003', 
   '00000000-0000-0000-0000-000000000001', 'Payment for landing page development'),
  (800.00, 'payment', 'pending', '00000000-0000-0000-0000-000000000003', 
   '00000000-0000-0000-0000-000000000002', 'Payment for UI design work')
ON CONFLICT (id) DO NOTHING;
