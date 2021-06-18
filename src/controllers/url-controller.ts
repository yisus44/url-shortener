import shortid from 'shortid';
import { URL } from '../models/URL';

import { Request, Response } from 'express';
import validator from 'validator';

import path from 'path';

const baseURL = 'https://flores-url-shorty.herokuapp.com';

async function createShortUrl(req: Request, res: Response) {
  const { longURL } = req.body;

  if (isNotValidURL(longURL)) {
    res.sendStatus(400);
    return;
  }

  const exists = await URL.findOne({ longURL });

  if (exists) {
    res.send(sendHTML(exists.shortURL));
    return;
  }
  try {
    const urlCode = shortid.generate();
    const shortURL = `${baseURL}/${urlCode}`;
    const url = new URL({
      shortURL,
      longURL,
      urlCode,
    });
    await url.save();
    res.send(sendHTML(shortURL));
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
  return `<p>Your url: <br><b>${shortURL}</b>`;
}

export { createShortUrl, redirect, sendIndex };
