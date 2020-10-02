import * as pg from 'pg';

const dbPool = new pg.Pool({
  host: 'localhost',
  database: 'tournament_tracker',
});

export { dbPool };
