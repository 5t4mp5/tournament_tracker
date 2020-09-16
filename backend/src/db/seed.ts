import { dbConn } from "./index";

dbConn.then((conn) => {
  conn
    .query(
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
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'block') THEN
      CREATE TYPE block as ENUM ('a', 'b');
    END IF;
  CREATE TABLE IF NOT EXISTS tournaments 
  (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), 
  title VARCHAR (255) NOT NULL, 
  format format NOT NULL, 
  avatar TEXT, 
  status status NOT NULL);
  CREATE TABLE IF NOT EXISTS competitors(
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR (255),
    avatar TEXT
  );
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    userame VARCHAR (255),
    avatar TEXT,
    email VARCHAR (255),
    password VARCHAR (255)
  );
  CREATE TABLE IF NOT EXISTS pickers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid REFERENCES users (id),
    tournament_id uuid REFERENCES tournaments (id) 
  );
  CREATE TABLE IF NOT EXISTS entrants (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    competitor_id uuid REFERENCES competitors (id),
    tournament_id uuid REFERENCES tournaments (id),
    block block NOT NULL
  );
  CREATE TABLE IF NOT EXISTS matches (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_id uuid REFERENCES tournaments (id),
    competitor1_id uuid REFERENCES competitors (id),
    competitor2_id uuid REFERENCES competitors (id),
    result VARCHAR (255)
  );
  END;
  $do$;`
    )
    .then(() => console.log("DB SEEDED!!!"))
    .catch((e) => console.error(e));
});
