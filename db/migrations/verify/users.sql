-- Verify docker-express-postgres-boilerplate:users on pg

BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'auth' AND table_name = 'users'
  ) THEN
    RAISE EXCEPTION 'Table "auth.users" does not exist!';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'id') THEN
    RAISE EXCEPTION 'Column "id" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'account_status_id') THEN
    RAISE EXCEPTION 'Column "account_status_id" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'role_id') THEN
    RAISE EXCEPTION 'Column "role_id" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'firstname') THEN
    RAISE EXCEPTION 'Column "firstname" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'lastname') THEN
    RAISE EXCEPTION 'Column "lastname" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'email') THEN
    RAISE EXCEPTION 'Column "email" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'password_hash') THEN
    RAISE EXCEPTION 'Column "password_hash" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'activation_token_hash') THEN
    RAISE EXCEPTION 'Column "activation_token_hash" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'activation_token_hash_expires_at') THEN
    RAISE EXCEPTION 'Column "activation_token_hash_expires_at" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'activation_token_used_at') THEN
    RAISE EXCEPTION 'Column "activation_token_used_at" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'reset_password_token_hash') THEN
    RAISE EXCEPTION 'Column "reset_password_token_hash" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'reset_password_token_hash_expires_at') THEN
    RAISE EXCEPTION 'Column "reset_password_token_hash_expires_at" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'password_updated_at') THEN
    RAISE EXCEPTION 'Column "password_updated_at" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'created_at') THEN
    RAISE EXCEPTION 'Column "created_at" is missing in "auth.users" table!';
  END IF;

  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'auth' AND table_name = 'users' AND column_name = 'updated_at') THEN
    RAISE EXCEPTION 'Column "updated_at" is missing in "auth.users" table!';
  END IF;

END
$$;

DO $$
DECLARE
  fk_count INT;
BEGIN
  SELECT COUNT(*) INTO fk_count
  FROM information_schema.table_constraints tc
  WHERE tc.table_schema = 'auth'
    AND tc.table_name = 'users'
    AND tc.constraint_type = 'FOREIGN KEY'
    AND tc.constraint_name = 'fk_account_status';

  IF fk_count = 0 THEN
    RAISE EXCEPTION 'Foreign key constraint "fk_account_status" is missing on "auth.users" table!';
  END IF;

  SELECT COUNT(*) INTO fk_count
  FROM information_schema.table_constraints tc
  WHERE tc.table_schema = 'auth'
    AND tc.table_name = 'users'
    AND tc.constraint_type = 'FOREIGN KEY'
    AND tc.constraint_name = 'fk_role';

  IF fk_count = 0 THEN
    RAISE EXCEPTION 'Foreign key constraint "fk_role" is missing on "auth.users" table!';
  END IF;
END
$$;

ROLLBACK;
