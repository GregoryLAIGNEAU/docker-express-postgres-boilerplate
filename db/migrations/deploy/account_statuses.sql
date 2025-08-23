-- Deploy docker-express-postgres-boilerplate:account_statuses to pg
-- requires: authschema

BEGIN;

CREATE TABLE IF NOT EXISTS auth.account_statuses (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);

COMMIT;
