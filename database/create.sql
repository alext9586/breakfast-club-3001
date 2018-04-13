DROP DATABASE IF EXISTS breakfastclub;
CREATE DATABASE breakfastclub;

\c breakfastclub;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
  ID uuid NOT NULL DEFAULT uuid_generate_v4(),
  created timestamp DEFAULT current_timestamp,
  firstname VARCHAR,
  lastname VARCHAR,
  slackusername VARCHAR,
  isactive BOOLEAN DEFAULT TRUE,
  CONSTRAINT pk_users PRIMARY KEY (ID)
);

INSERT INTO users (firstname, lastname, slackusername)
  VALUES ('Test', 'User', 'testuser');

CREATE TABLE userrotation (
  ID uuid NOT NULL DEFAULT uuid_generate_v4(),
  userid uuid NOT NULL,
  rotationorder INTEGER NOT NULL,
  CONSTRAINT pk_userrotation PRIMARY KEY (ID)
);

CREATE TABLE arrivallog (
  ID uuid NOT NULL DEFAULT uuid_generate_v4(),
  userid uuid NOT NULL,
  arrivaltime timestamp DEFAULT current_timestamp,
  CONSTRAINT pk_arrivallog PRIMARY KEY (ID)
);
