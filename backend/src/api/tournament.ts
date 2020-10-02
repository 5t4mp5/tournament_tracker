import { dbPool } from '../db';

export const getTournament = async (id: string) => {
  const client = await dbPool.connect();
  const tournamentQuery = `SELECT * FROM tournaments WHERE id = '${id}';`;
  const tournament = (await client.query(tournamentQuery)).rows[0];
  const entrants = (await getEntrants(tournament.id)).rows;
  const output = { ...tournament, entrants };
  client.release();
  return output;
};

export const getEntrants = async (tournamentId: string) => {
  const client = await dbPool.connect();
  const entrantQuery = `
  SELECT * FROM entrants
  JOIN competitors ON (entrants.competitor_id = competitors.id)
  WHERE tournament_id = '${tournamentId}';
   `;
  const entrants = await client.query(entrantQuery).catch((e) => {
    throw e;
  });
  client.release();
  return entrants;
};
