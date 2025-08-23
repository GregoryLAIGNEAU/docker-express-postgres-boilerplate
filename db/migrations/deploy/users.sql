-- Deploy docker-express-postgres-boilerplate:users to pg
-- requires: roles
-- requires: account_statuses
-- requires: authschema

BEGIN;

CREATE TABLE IF NOT EXISTS auth.users (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  account_status_id INT NOT NULL DEFAULT 1,
  role_id INT NOT NULL DEFAULT 1,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  activation_token_hash VARCHAR(255),
  activation_token_hash_expires_at TIMESTAMPTZ,
  activation_token_used_at TIMESTAMPTZ,
  reset_password_token_hash VARCHAR(255),
  reset_password_token_hash_expires_at TIMESTAMPTZ,
  password_updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_account_status
    FOREIGN KEY (account_status_id) REFERENCES auth.account_statuses (id),
  CONSTRAINT fk_role
    FOREIGN KEY (role_id) REFERENCES auth.roles (id)
);

COMMIT;
