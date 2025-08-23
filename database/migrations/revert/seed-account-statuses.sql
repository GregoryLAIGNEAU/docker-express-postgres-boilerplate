-- Revert docker-express-postgres-boilerplate:seed-account-statuses from pg

BEGIN;

DELETE FROM auth.account_statuses;

COMMIT;
