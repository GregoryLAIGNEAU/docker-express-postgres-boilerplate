-- Verify docker-express-postgres-boilerplate:seed-account-statuses on pg

BEGIN;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.tables 
    WHERE table_schema = 'auth' 
      AND table_name = 'account_statuses'
  ) THEN
    RAISE EXCEPTION 'Table "auth.account_statuses" does not exist!';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
      AND table_name = 'account_statuses' 
      AND column_name = 'id'
  ) THEN
    RAISE EXCEPTION 'Column "id" is missing in "auth.account_statuses" table!';
  END IF;

  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_schema = 'auth' 
      AND table_name = 'account_statuses' 
      AND column_name = 'name'
  ) THEN
    RAISE EXCEPTION 'Column "name" is missing in "auth.account_statuses" table!';
  END IF;
END
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM pg_indexes
    WHERE schemaname = 'auth'
      AND tablename = 'account_statuses'
      AND indexname = 'account_statuses_name_key'
  ) THEN
    RAISE EXCEPTION 'Unique index or constraint on "name" column is missing in "auth.account_statuses" table!';
  END IF;
END
$$;

ROLLBACK;
