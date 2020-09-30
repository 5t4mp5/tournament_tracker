import * as pg from "pg";

const client = new pg.Client("postgress://localhost/tournament_tracker");

let dbLink: pg.Client | null;

async function dbConnect(_client: pg.Client) {
  await _client
    .connect()
    .then((conn) => {
      console.log("DB CONNECTED");
      return conn;
    })
    .catch((err) => console.log(err));

  return _client;
}

const dbConn = async () => {
  if (!dbLink) dbLink = await dbConnect(client);
  return dbLink;
};

export { dbConn };
