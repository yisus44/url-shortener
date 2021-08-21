require('dotenv').config({ path: __dirname + '/.env' });
import { cpus } from 'os';
import process from 'process';
import cluster from 'cluster';
import { app } from './app';
const numCPUs = cpus().length;
const PORT: number = Number(process.env.PORT) || 8000;
//TODO: Change it to .isPrimary when 16 or more become stable
if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    //Loggin stuff
    console.log(`Worker ${worker} endend, reasons:`);
    if (signal) {
      console.log(`worker was killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`worker exited with error code: ${code}`);
    } else {
      console.log('worker success!');
    }
  });
} else {
  console.log(`Worker ${process.pid} started`);
  app.listen(PORT, function () {
    console.log('Server up and running on port', PORT);
  });
}
