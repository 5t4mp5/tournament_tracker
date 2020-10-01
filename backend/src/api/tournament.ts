import { dbConn } from '../db';

export const getTournament = async (id: string) => {
  const client = await dbConn();
  const tournamentQuery = `SELECT * FROM tournaments WHERE id = '${id}';`;
  return await client.query(tournamentQuery).catch((e) => {
    throw e;
  });
};

export const getEntrants = async (tournamentId: string) => {
  const client = await dbConn();
  const entrantQuery = `
  SELECT * FROM entrants
  JOIN competitors ON (entrants.competitor_id = competitors.id)
  WHERE tournament_id = '${tournamentId}';
   `;
  return await client.query(entrantQuery).catch((e) => {
    throw e;
  });
};
