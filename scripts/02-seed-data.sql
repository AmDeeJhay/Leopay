-- Insert sample tasks for freelancers
INSERT INTO tasks (title, description, required_skills, client_wallet, amount, status) VALUES
('Build React Dashboard', 'Create a responsive dashboard with charts and analytics', ARRAY['Developer', 'Designer'], '0x1234...abcd', 2500.00, 'open'),
('Design Mobile App UI', 'Design modern UI/UX for a fintech mobile application', ARRAY['Designer'], '0x5678...efgh', 1800.00, 'open'),
('Smart Contract Audit', 'Security audit for DeFi protocol smart contracts', ARRAY['Blockchain Engineer'], '0x9abc...ijkl', 5000.00, 'open'),
('Technical Documentation', 'Write comprehensive API documentation', ARRAY['Technical Writer'], '0xdef0...mnop', 1200.00, 'open'),
('Community Management', 'Manage Discord and Twitter for 3 months', ARRAY['Community Manager'], '0x2468...qrst', 3000.00, 'in_progress'),
('Data Analysis Report', 'Analyze user behavior and create insights report', ARRAY['Data Analyst'], '0x1357...uvwx', 2200.00, 'open');
