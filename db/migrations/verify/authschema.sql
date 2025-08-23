-- Verify docker-express-postgres-boilerplate:authschema on pg

BEGIN;

SELECT schema_name
FROM information_schema.schemata
WHERE schema_name = 'auth';

ROLLBACK;
