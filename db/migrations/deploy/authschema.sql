-- Deploy docker-express-postgres-boilerplate:authschema to pg

BEGIN;

CREATE SCHEMA IF NOT EXISTS auth;

COMMIT;
