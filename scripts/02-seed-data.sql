-- Insert sample data (only run this once)
-- Note: Replace the UUIDs with actual user IDs from your auth.users table

-- Sample profiles (these would be created automatically when users sign up)
INSERT INTO profiles (id, full_name, user_type, role) VALUES
  ('00000000-0000-0000-0000-000000000001', 'John Doe', 'freelancer', 'freelancer'),
  ('00000000-0000-0000-0000-000000000002', 'Jane Smith', 'employer', 'employee'),
  ('00000000-0000-0000-0000-000000000003', 'Bob Johnson', 'contractor', 'freelancer'),
  ('00000000-0000-0000-0000-000000000004', 'Alice Brown', 'employee', 'employee')
ON CONFLICT (id) DO NOTHING;

-- Sample tasks
INSERT INTO tasks (title, description, status, priority, assigned_to, created_by) VALUES
  ('Design Landing Page', 'Create a modern landing page for the LeoPay application', 'in_progress', 'high', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002'),
  ('Implement Payment Gateway', 'Integrate Stripe payment processing', 'pending', 'high', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000002'),
  ('Write Documentation', 'Create user documentation for the platform', 'pending', 'medium', '00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002')
ON CONFLICT DO NOTHING;

-- Sample transactions
INSERT INTO transactions (amount, type, status, description, user_id) VALUES
  (1500.00, 'payment', 'completed', 'Freelance work payment', '00000000-0000-0000-0000-000000000001'),
  (2000.00, 'payment', 'completed', 'Contract work payment', '00000000-0000-0000-0000-000000000003'),
  (500.00, 'withdrawal', 'pending', 'Withdraw to bank account', '00000000-0000-0000-0000-000000000001')
ON CONFLICT DO NOTHING;

-- Sample payroll entries
INSERT INTO payroll_entries (employee_id, amount, pay_period_start, pay_period_end, status, created_by) VALUES
  ('00000000-0000-0000-0000-000000000004', 3000.00, '2024-01-01', '2024-01-15', 'paid', '00000000-0000-0000-0000-000000000002'),
  ('00000000-0000-0000-0000-000000000004', 3000.00, '2024-01-16', '2024-01-31', 'pending', '00000000-0000-0000-0000-000000000002')
ON CONFLICT DO NOTHING;
