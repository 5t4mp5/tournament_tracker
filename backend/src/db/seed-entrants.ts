import { competitors } from './competitors';
import { dbPool } from './index';
import { bosj27_avatar } from './assets';
import { PoolClient } from 'pg';

interface entrant {
  name: string;
  block: 'a' | 'b';
}

const entrants: entrant[] = competitors.map((competitor) => ({
  name: competitor,
  block: 'a',
}));

const generateQuery = async (entrants: entrant[], tournamentName: string) => {
  const conn = await dbPool.connect();
  const tournamentId = (
    await conn.query(
      `SELECT id FROM tournaments WHERE title = '${tournamentName}'`
    )
  ).rows[0].id;
  const baseQuery = `INSERT INTO entrants (competitor_id, tournament_id, block) VALUES`;
  let entrantsQuery = ``;
  for (let i = 0; i < entrants.length; i++) {
    entrantsQuery += `((SELECT id FROM competitors WHERE name = '${
      entrants[i].name
    }'), '${tournamentId}', '${entrants[i].block}')${
      i < entrants.length - 1 ? ',' : ''
    }
        `;
  }
  const finalQuery = baseQuery + entrantsQuery + ';';
  return finalQuery;
};

const generateMatches = async (conn: PoolClient) => {
  const entrantsResponse = await conn
    .query(`SELECT id FROM entrants`)
    .catch((e) => console.error(e));
  if (!entrantsResponse) return;
  const entrants = [...entrantsResponse.rows];
  const matches = [];
  while (entrants.length > 1) {
    const current = entrants[0];
    for (let i = 1; i < entrants.length; i++) {
      matches.push({
        competitor1_id: current.id,
        competitor2_id: entrants[i].id,
      });
    }
    entrants.shift();
  }
  const tournament = await conn.query(
    `SELECT id FROM tournaments WHERE title = 'Best of the Super Juniors 27'`
  );
  const matchesQuery = matches.reduce((query, match, idx) => {
    return (
      query +
      `\n('${tournament.rows[0].id}', '${match.competitor1_id}', '${
        match.competitor2_id
      }', 'N/A')${idx !== matches.length - 1 ? ',' : ''}`
    );
  }, ``);
  const fullQuery = `INSERT INTO matches (tournament_id, entrant1_id, entrant2_id, result) VALUES ${matchesQuery};
  `;
  await conn.query(fullQuery).catch((e) => console.error(e));
};

dbPool
  .connect()
  .then(async (conn) => {
    await conn.query(`INSERT INTO tournaments (title, format, avatar, status)
    VALUES('Best of the Super Juniors 27', 'round-robin', '${bosj27_avatar}', 'open')`);
    await conn.query(
      await generateQuery(entrants, 'Best of the Super Juniors 27')
    );
    return await generateMatches(conn);
  })
  .then(() => {
    console.log('ENTRANTS SEEDED');
    process.exit(0);
  })
  .catch((e) => console.error(e));
