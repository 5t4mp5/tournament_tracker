import { dbPool } from '../db/index';

export async function getUser(id: string) {
  console.log("FETCHED");
  const client = await dbPool.connect();
  const userQuery = `SELECT * FROM users WHERE id = '${id}';`;
  const user = await client.query(userQuery).catch((e) => {
    throw e;
  });
  client.release();
  return user.rows[0];
}
