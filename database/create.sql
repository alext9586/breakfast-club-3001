DROP DATABASE IF EXISTS breakfastclub;
CREATE DATABASE breakfastclub;

\c breakfastclub;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE members (
  ID uuid NOT NULL DEFAULT uuid_generate_v4(),
  created timestamp DEFAULT current_timestamp,
  firstname VARCHAR,
  lastname VARCHAR,
  slackusername VARCHAR,
  isactive BOOLEAN DEFAULT TRUE,
  CONSTRAINT pk_members PRIMARY KEY (ID)
);

INSERT INTO members (firstname, lastname, slackusername)
  VALUES ('Test', 'User', 'testuser');

CREATE TABLE memberrotation (
  ID uuid NOT NULL DEFAULT uuid_generate_v4(),
  memberid uuid NOT NULL,
  rotationorder INTEGER NOT NULL,
  CONSTRAINT pk_memberrotation PRIMARY KEY (ID)
);

CREATE TABLE arrivallog (
  ID uuid NOT NULL DEFAULT uuid_generate_v4(),
  memberid uuid NOT NULL,
  arrivaltime timestamp DEFAULT current_timestamp,
  CONSTRAINT pk_arrivallog PRIMARY KEY (ID)
);
