import * as pg from 'pg';

const client = new pg.Client('postgress://localhost/tournament-tracker');

client
  .connect()
  .then(() => console.log('connected'))
  .catch((err) => console.log(err));

client.query(
  `CREATE TABLE tournaments (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), title VARCHAR (255) NOT NULL, type ENUM('round-robin', 'single-elimination'), avatar VARCHAR (255), status ENUM ('open', 'locked'))`
);
