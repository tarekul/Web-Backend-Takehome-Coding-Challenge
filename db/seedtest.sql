DROP DATABASE IF EXISTS raffledbtest;
CREATE DATABASE raffledbtest;

\c raffledbtest

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  raffle_id INT,
  firstname VARCHAR NOT NULL,
  lastname VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  phone VARCHAR,
  registered_at TIMESTAMP 
);

CREATE TABLE raffles (
  id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  secret_token VARCHAR UNIQUE NOT NULL,
  created_at TIMESTAMP,
  winner_id INT
);

INSERT INTO users (raffle_id,firstname, lastname, email, phone, registered_at) VALUES (1,'Jane','Doe','jdoe@email.com','+1(917) 555-1234', '1/8/1999');
INSERT INTO users (raffle_id,firstname, lastname, email, registered_at) VALUES (2,'Mary','Jane','mjane@email.com', '5/8/1998');
INSERT INTO users (raffle_id,firstname, lastname, email, registered_at) VALUES (1,'Peter','Parker','pparker@email.com', '1/2/2021');
INSERT INTO users (raffle_id,firstname, lastname, email,  registered_at) VALUES (2,'Cecila','Moreno','cmoreno@email.com', '3/6/1993');

INSERT INTO raffles (name, secret_token, created_at) VALUES ('Six Flags','b2CrE7', '1/10/1999');
INSERT INTO raffles (name, secret_token, created_at) VALUES ('Cruise','s3Cr37', '1/10/1999');
INSERT INTO raffles (name, secret_token, created_at) VALUES ('Ireland Trip','abc1234', '5/30/2021');