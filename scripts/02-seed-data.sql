-- Insert sample data for testing (optional)
-- This script can be run after the tables are created

-- Sample profiles (these would normally be created through the application)
INSERT INTO profiles (id, full_name, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'John Doe', 'freelancer'),
  ('00000000-0000-0000-0000-000000000002', 'Jane Smith', 'employer'),
  ('00000000-0000-0000-0000-000000000003', 'Bob Johnson', 'employee')
ON CONFLICT (id) DO NOTHING;

-- Sample tasks
INSERT INTO tasks (title, description, status, priority, assigned_to, created_by) VALUES
  ('Design Landing Page', 'Create a modern landing page for the application', 'pending', 'high', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
  ('Implement Authentication', 'Set up user authentication system', 'in_progress', 'high', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
  ('Database Setup', 'Configure database tables and relationships', 'completed', 'medium', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002');

-- Sample transactions
INSERT INTO transactions (amount, type, status, from_user, to_user, description) VALUES
  (1500.00, 'payment', 'completed', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Payment for landing page design'),
  (2000.00, 'payment', 'pending', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 'Payment for authentication implementation'),
  (800.00, 'payment', 'completed', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', 'Payment for database setup');
