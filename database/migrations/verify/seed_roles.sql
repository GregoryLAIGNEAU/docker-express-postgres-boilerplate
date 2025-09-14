-- Verify docker-express-postgres-boilerplate:seed-roles on pg

BEGIN;

DO $$
DECLARE
  count_admin INT;
  count_user INT;
BEGIN
  SELECT COUNT(*) INTO count_admin 
  FROM auth.roles 
  WHERE name = 'admin';
  IF count_admin = 0 THEN
    RAISE EXCEPTION 'Seed data missing: ''admin'' role not found in auth.roles!';
  END IF;

  SELECT COUNT(*) INTO count_user 
  FROM auth.roles 
  WHERE name = 'user';
  IF count_user = 0 THEN
    RAISE EXCEPTION 'Seed data missing: ''user'' role not found in auth.roles!';
  END IF;
END
$$;

ROLLBACK;
