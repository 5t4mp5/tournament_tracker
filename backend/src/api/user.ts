import { dbPool } from '../db/index';

export async function getUser(id: string) {
  const client = await dbPool.connect();
  const userQuery = `SELECT * FROM users WHERE id = '${id}';`;
  return await client.query(userQuery).catch((e) => {
    throw e;
  });
}
