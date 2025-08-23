-- Deploy docker-express-postgres-boilerplate:roles to pg
-- requires: account_statuses
-- requires: authschema

BEGIN;

CREATE TABLE IF NOT EXISTS auth.roles (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name VARCHAR(20) NOT NULL UNIQUE
);

COMMIT;
