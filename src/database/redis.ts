import redis from 'redis';
const password = process.env.REDIS_PASSWORD;
const host = process.env.REDIS_HOST;
const port = Number(process.env.REDIS_PORT);
const client = redis.createClient({
  host,
  port,
  password,
});

client.on('ready', function () {
  console.log('Redis instance up and running!');
});

client.on('error', function (error) {
  console.log(error);
});

export { client };
