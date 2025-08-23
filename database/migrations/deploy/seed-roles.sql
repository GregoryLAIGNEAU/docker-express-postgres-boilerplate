-- Deploy docker-express-postgres-boilerplate:seed-roles to pg
-- requires: roles

BEGIN;

INSERT INTO
  auth.roles (name)
VALUES
  ('admin'),
  ('user');

COMMIT;
