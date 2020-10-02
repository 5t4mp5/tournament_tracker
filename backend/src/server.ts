import * as express from 'express';
const app = express();
import * as path from 'path';

//utils
import { getUser } from './api/user';
import { getTournament } from './api/tournament';

const port: number | string = process.env.PORT || 3000;

app.get('/app.js', (req, res) =>
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'dist', 'bundle.js')
  )
);

app.get('/', (req, res) =>
  res.sendFile(
    path.join(__dirname, '..', '..', 'frontend', 'dist', 'index.html')
  )
);

app.get('/api/user/:id', async (req, res) => {
  const user = await getUser(req.params.id);
  res.json(user);
});

app.get('/api/tournament/:id', async (req, res) => {
  const tournament = await getTournament(req.params.id);
  res.json(tournament);
});

app.listen(port, () => console.log(`listening on port ${port}`));
