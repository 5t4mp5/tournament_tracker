import * as pg from "pg";

const client = new pg.Client("postgress://localhost/tournament_tracker");

client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

client.query(
  `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DO
  $do$
  BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'format') THEN
      CREATE TYPE format as ENUM ('round-robin', 'single-elimination');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status') THEN
      CREATE TYPE status as ENUM ('open', 'locked');
    END IF;
  CREATE TABLE IF NOT EXISTS tournaments 
  (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
  title VARCHAR (255) NOT NULL, 
  format format NOT NULL, 
  avatar VARCHAR (255), 
  status status NOT NULL);
  CREATE TABLE IF NOT EXISTS competitors(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR (255),
    avatar VARCHAR (255)
  );
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userame VARCHAR (255),
    avatar VARCHAR (255),
    email VARCHAR (255),
    password VARCHAR (255),
  );
  END;
  $do$;`
);
