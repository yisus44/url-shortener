require('dotenv').config({ path: __dirname + '/.env' });

import { app } from './app';
import throng from 'throng';

const PORT: number = Number(process.env.PORT) || 8000;
const WORKERS = Number(process.env.WEB_CONCURRENCY) || 1;

throng(() => start());

function start() {
  app.listen(PORT, function () {
    console.log('Server up and running on port', PORT);
  });
}
