-- Revert docker-express-postgres-boilerplate:users from pg

BEGIN;

DROP TABLE IF EXISTS auth.users;

COMMIT;
