-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE auth_type_enum AS ENUM ('email', 'wallet');
CREATE TYPE user_role_enum AS ENUM ('freelancer', 'employee');
CREATE TYPE task_status_enum AS ENUM ('open', 'in_progress', 'completed');
CREATE TYPE payment_type_enum AS ENUM ('freelance', 'payroll');

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_type auth_type_enum NOT NULL,
    email TEXT,
    wallet_address TEXT,
    role user_role_enum NOT NULL,
    skills TEXT[],
    zk_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tasks table (for Freelance flow)
CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT[],
    client_wallet TEXT,
    is_escrowed BOOLEAN DEFAULT FALSE,
    amount NUMERIC(10,2),
    status task_status_enum DEFAULT 'open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_wallet TEXT,
    receiver_wallet TEXT,
    amount NUMERIC(10,2) NOT NULL,
    proof_hash TEXT,
    type payment_type_enum NOT NULL,
    paid_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_wallet ON users(wallet_address);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_payments_type ON payments(type);
