interface IKeys {
  MONGODB_URI: string;
  PORT: number;
  SALT_ROUND: number;
  JWT_SECRET: string;
}

const keys: IKeys = {
  MONGODB_URI: String(process.env.MONGODB_URI),
  PORT: Number(process.env.PORT) || 3000,
  SALT_ROUND: Number(process.env.SALT_ROUND) || 10,
  JWT_SECRET: String(process.env.JWT_SECRET),
};

export { keys };
