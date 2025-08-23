-- Revert docker-express-postgres-boilerplate:seed-roles from pg

BEGIN;

DELETE FROM auth.roles;

COMMIT;
