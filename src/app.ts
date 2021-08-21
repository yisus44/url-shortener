import './database/db';
import './database/redis';
import express from 'express';
import helmet from 'helmet';


import { urlRouter } from './routes/url-router';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(helmet());
app.use(urlRouter);

export { app };
