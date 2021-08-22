import path from 'path';
import { promisify } from 'util';

import shortid from 'shortid';
import validator from 'validator';
import { NextFunction, Request, Response } from 'express';

import { URL } from '../models/URL';
import { sendHtmlNotFound, sendHtmlUrl } from './html';

import { client, client as redisClient } from '../database/redis';
const getAsync = promisify(redisClient.get).bind(client);

const baseURL = 'https://flores-url-shorty.herokuapp.com';

async function createShortUrl(req: Request, res: Response) {
  const { longURL } = req.body;
  console.log(longURL);
  if (!validator.isURL(longURL)) {
    res.sendStatus(400);
    return;
  }

  try {
    const exists = await URL.findOne({ longURL });

    if (exists) {
      res.send(sendHtmlUrl(exists.shortURL));
      return;
    }
    const urlCode = shortid.generate();
    const shortURL = `${baseURL}/${urlCode}`;
    const url = new URL({
      shortURL,
      longURL,
      urlCode,
    });
    await url.save();
    res.send(sendHtmlUrl(shortURL));
    //its irrelevant for the client to know if its cached or not so we dont await or set a callback for this
    redisClient.set(urlCode, longURL, function () {
      console.log('cache set');
    });
    return;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
    return;
  }
}

async function redirect(req: Request, res: Response) {
  const { urlCode } = req.params;
  try {
    const cachedUrl = await getAsync(urlCode);
    if (cachedUrl) {
      return res.redirect(cachedUrl);
    }
    const matchURL = await URL.findOne({ urlCode });
    if (!matchURL) {
      return res.status(404).send(notFound(req));
    }
    return res.redirect(matchURL.longURL);
  } catch (error) {
    res.send('We dont have that URL registered');
    console.log(error);
    return;
  }
}

function notFound(req: Request) {
  // respond with html page
  if (req.accepts('html')) {
    return sendHtmlNotFound();
  }

  // respond with json
  if (req.accepts('json')) {
    return JSON.stringify({
      error: 'We could not find what you are looking for',
    });
  }

  // default to plain-text. send()
  return 'We could not find what you are looking for';
}

async function sendIndex(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
}

export { createShortUrl, redirect, sendIndex, notFound };
