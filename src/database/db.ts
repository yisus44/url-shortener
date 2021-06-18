import mongoose from 'mongoose';

import { keys } from '../config/keys';
async function init() {
  try {
    console.log(process.env.MONGODB_URI);
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
}

(async function () {
  await init();
})();
