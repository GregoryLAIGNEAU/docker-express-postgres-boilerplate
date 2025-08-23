-- Deploy docker-express-postgres-boilerplate:seed-account-statuses to pg
-- requires: account_statuses

BEGIN;

INSERT INTO
  auth.account_statuses (name)
VALUES
  ('pending_verification'),
  ('active'),
  ('suspended');

COMMIT;
