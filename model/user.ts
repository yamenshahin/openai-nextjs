import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
    unique: true,
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

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
