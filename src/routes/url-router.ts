import { Router } from 'express';
import {
  createShortUrl,
  redirect,
  sendIndex,
  notFound,
} from '../controllers/url-controller';

const urlRouter = Router();

urlRouter.get('/', sendIndex);

urlRouter.post('/shorter', createShortUrl);

urlRouter.get('/:urlCode', redirect);

urlRouter.get('*', notFound);

export { urlRouter };
