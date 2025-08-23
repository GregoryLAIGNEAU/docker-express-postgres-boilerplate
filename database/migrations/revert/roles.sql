-- Revert docker-express-postgres-boilerplate:roles from pg

BEGIN;

DROP TABLE IF EXISTS auth.roles;

COMMIT;
