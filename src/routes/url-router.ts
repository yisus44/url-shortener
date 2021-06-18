import { Router } from 'express';
import {
  createShortUrl,
  redirect,
  sendIndex,
} from '../controllers/url-controller';

const urlRouter = Router();

urlRouter.post('/shorter', createShortUrl);

urlRouter.get('/:urlCode', redirect);

urlRouter.get('/', sendIndex);

export { urlRouter };
