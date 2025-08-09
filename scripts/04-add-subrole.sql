-- Adds subrole + gating flags to profiles. Safe to run multiple times.

-- Ensure the profiles table exists before altering.
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') THEN
    RAISE EXCEPTION 'profiles table does not exist. Create it before running this migration.';
  END IF;
END$$;

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS role text,
  ADD COLUMN IF NOT EXISTS subrole text CHECK (subrole IN ('receiver','sender')),
  ADD COLUMN IF NOT EXISTS profile_completed boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS kyc_verified boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now();

-- Optional helpful index
CREATE INDEX IF NOT EXISTS idx_profiles_role_subrole ON profiles(role, subrole);
