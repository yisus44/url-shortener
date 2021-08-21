import mongoose from 'mongoose';

import { keys } from '../config/keys';
async function init() {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database up and running');
  } catch (error) {
    console.log(error);
  }
}

init();
