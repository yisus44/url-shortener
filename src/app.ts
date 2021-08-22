import './database/db';
import './database/redis';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import { urlRouter } from './routes/url-router';

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(helmet());
app.use(morgan('common'));
app.use(urlRouter);

export { app };
