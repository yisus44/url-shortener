import path from 'path';
import { promisify } from 'util';

import shortid from 'shortid';
import validator from 'validator';
import { Request, Response } from 'express';

import { URL } from '../models/URL';

import { client, client as redisClient } from '../database/redis';
const getAsync = promisify(redisClient.get).bind(client);

const baseURL = 'https://flores-url-shorty.herokuapp.com';

async function createShortUrl(req: Request, res: Response) {
  const { longURL } = req.body;

  if (isNotValidURL(longURL)) {
    res.sendStatus(400);
    return;
  }

  try {
    const exists = await URL.findOne({ longURL });

    if (exists) {
      res.send(sendHTML(exists.shortURL));
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
    res.send(sendHTML(shortURL));
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
  console.log('hola esquizo');
  try {
    const cachedUrl = await getAsync(urlCode);
    if (cachedUrl) {
      res.redirect(cachedUrl);
    }
    const matchURL = await URL.findOne({ urlCode });
    if (!matchURL) {
      res.sendStatus(404);
      return;
    }
    res.redirect(matchURL.longURL);
    return;
  } catch (error) {
    res.send('We dont have that URL registered');
    console.log(error);
    return;
  }
}

async function sendIndex(req: Request, res: Response) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
}

function isNotValidURL(URL: string) {
  if (!URL || !validator.isURL(URL)) {
    return true;
  }
  return false;
}

function sendHTML(shortURL: string): string {
  return `<p>Your url: <br><b>${shortURL}</b>
  Go back
  <a href="https://flores-url-shorty.herokuapp.com/">
    <button>Go back</button>
  </a>
  `;
}

export { createShortUrl, redirect, sendIndex };
