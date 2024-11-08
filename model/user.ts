import mongoose, { Schema } from 'mongoose';
import { threadId } from 'worker_threads';

const userSchema = new Schema({
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  thread: {
    type: [
      {
        threadId: String,
        threadTitle: String,
      },
    ],
    default: undefined,
  },
});

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
