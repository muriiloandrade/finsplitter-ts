CREATE SEQUENCE IF NOT EXISTS bill_id_seq;

CREATE TABLE IF NOT EXISTS bill (
  id uuid NOT NULL PRIMARY KEY,
  card_id uuid,
  month smallint,
  year smallint,
  due_date smallint,
  due_month smallint,
  amount numeric,
  paid boolean,
  paid_on date
);

CREATE SEQUENCE IF NOT EXISTS card_id_seq;

CREATE TABLE IF NOT EXISTS card (
  id uuid NOT NULL PRIMARY KEY,
  brand_id uuid,
  name varchar NOT NULL,
  "4ld" smallint NOT NULL,
  due_date smallint
);

COMMENT ON COLUMN card."4ld" IS '4ld = 4 last digits, corresponde aos 4 últimos dígitos do cartão';

CREATE SEQUENCE IF NOT EXISTS transaction_id_seq;

CREATE TABLE IF NOT EXISTS transaction (
  id bigint NOT NULL PRIMARY KEY
);

CREATE SEQUENCE IF NOT EXISTS person_id_seq;

CREATE TABLE IF NOT EXISTS person (
  id uuid NOT NULL PRIMARY KEY,
  nome varchar,
  email varchar
);

CREATE SEQUENCE IF NOT EXISTS card_person_id_seq;

CREATE TABLE IF NOT EXISTS "card-person" (
  id bigint NOT NULL PRIMARY KEY
);

CREATE SEQUENCE IF NOT EXISTS transaction_person_id_seq;

CREATE TABLE IF NOT EXISTS "transaction-person" (
  id bigint NOT NULL PRIMARY KEY
);

CREATE SEQUENCE IF NOT EXISTS card_brand_id_seq;

CREATE TABLE IF NOT EXISTS card_brand (
  id uuid NOT NULL PRIMARY KEY,
  name varchar NOT NULL
);

CREATE UNIQUE INDEX IF NOT EXISTS unique_name ON card_brand (name);

ALTER TABLE card ADD CONSTRAINT card_brand_id_fk FOREIGN KEY (brand_id) REFERENCES card_brand (id);
