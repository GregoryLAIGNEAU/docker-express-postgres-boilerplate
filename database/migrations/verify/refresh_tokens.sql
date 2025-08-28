-- Verify docker-express-postgres-boilerplate:refresh_tokens on pg

BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'auth' AND table_name = 'refresh_tokens'
  ) THEN
    RAISE EXCEPTION 'Table "auth.refresh_tokens" does not exist!';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'auth' AND table_name = 'refresh_tokens' AND column_name = 'id'
  ) THEN
    RAISE EXCEPTION 'Column "id" is missing in "auth.refresh_tokens" table!';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'auth' AND table_name = 'refresh_tokens' AND column_name = 'user_id'
  ) THEN
    RAISE EXCEPTION 'Column "user_id" is missing in "auth.refresh_tokens" table!';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'auth' AND table_name = 'refresh_tokens' AND column_name = 'token_hash'
  ) THEN
    RAISE EXCEPTION 'Column "token_hash" is missing in "auth.refresh_tokens" table!';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'auth' AND table_name = 'refresh_tokens' AND column_name = 'expires_at'
  ) THEN
    RAISE EXCEPTION 'Column "expires_at" is missing in "auth.refresh_tokens" table!';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'auth' AND table_name = 'refresh_tokens' AND column_name = 'created_at'
  ) THEN
    RAISE EXCEPTION 'Column "created_at" is missing in "auth.refresh_tokens" table!';
  END IF;

  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'auth' AND table_name = 'refresh_tokens' AND column_name = 'revoked_at'
  ) THEN
    RAISE EXCEPTION 'Column "revoked_at" is missing in "auth.refresh_tokens" table!';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.key_column_usage kcu
    JOIN information_schema.table_constraints tc
      ON kcu.constraint_name = tc.constraint_name
    JOIN information_schema.constraint_column_usage ccu
      ON tc.constraint_name = ccu.constraint_name
    WHERE tc.table_schema = 'auth'
      AND tc.table_name = 'refresh_tokens'
      AND tc.constraint_type = 'FOREIGN KEY'
      AND kcu.column_name = 'user_id'
      AND ccu.table_name = 'users'
      AND ccu.column_name = 'id'
  ) THEN
    RAISE EXCEPTION 'Foreign key constraint "fk_user" on "user_id" in "auth.refresh_tokens" is missing!';
  END IF;
END
$$;

ROLLBACK;
