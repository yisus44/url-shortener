import { Schema, model } from 'mongoose';

const URLSchema = new Schema({
  urlCode: { type: String },
  shortURL: { type: String },
  longURL: {
    type: String,
    required: true,
  },
  createdAt: { type: String, default: Date.now },
});

const URL = model('URL', URLSchema);

export { URL };
