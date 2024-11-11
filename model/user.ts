import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  threads: {
    type: [
      {
        threadId: String,
        threadTitle: String,
      },
    ],
    default: undefined,
  },
});

export const User = model('User', userSchema);
