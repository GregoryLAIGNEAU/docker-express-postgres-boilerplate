-- Revert docker-express-postgres-boilerplate:authschema from pg

BEGIN;

DROP SCHEMA IF EXISTS auth CASCADE;

COMMIT;
