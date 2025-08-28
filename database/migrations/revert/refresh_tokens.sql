-- Revert docker-express-postgres-boilerplate:refresh_tokens from pg

BEGIN;

DROP TABLE IF EXISTS auth.refresh_tokens;

COMMIT;
