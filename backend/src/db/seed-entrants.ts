import { competitors } from './competitors';
import { dbPool } from './index';
import { bosj27_avatar } from './assets';

interface entrant {
  name: string;
  block: 'a' | 'b';
}

const entrants: entrant[] = competitors.map((competitor, idx) => ({
  name: competitor,
  block: idx < 10 ? 'a' : 'b',
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

dbPool
  .connect()
  .then(async (conn) => {
    await conn.query(`INSERT INTO tournaments (title, format, avatar, status)
    VALUES('Best of the Super Juniors 27', 'round-robin', '${bosj27_avatar}', 'open')`)
    return conn.query(await generateQuery(entrants, 'Best of the Super Juniors 27'));
  })
  .then(() => {
    console.log('ENTRANTS SEEDED');
    process.exit(0);
  })
  .catch((e) => console.error(e));
