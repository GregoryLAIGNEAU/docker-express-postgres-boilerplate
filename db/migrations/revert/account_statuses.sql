-- Revert docker-express-postgres-boilerplate:account_statuses from pg

BEGIN;

DROP TABLE IF EXISTS auth.account_statuses;

COMMIT;
