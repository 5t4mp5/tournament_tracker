import * as pg from "pg";

const client = new pg.Client("postgress://localhost/tournament_tracker");

async function dbConnect(_client: pg.Client) {
  await _client
    .connect()
    .then(() => console.log("db connected"))
    .catch((err) => console.log(err));

  return _client;
}

const dbConn = dbConnect(client);

export { dbConn };
