require('dotenv').config({ path: __dirname + '/.env' });

import { app } from './app';
const PORT: number = Number(process.env.PORT) || 8000;

app.listen(PORT, function () {
  console.log('Server up and running on port', PORT);
});
