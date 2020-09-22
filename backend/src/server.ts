import * as express from 'express';
const app = express();
import * as path from 'path';
import { getUser } from './api/user';

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
  console.log(req.params);
  const user = await getUser(req.params.id);
  res.json(user.rows[0]);
});

app.listen(port, () => console.log(`listening on port ${port}`));
