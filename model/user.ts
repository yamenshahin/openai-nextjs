import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
  password: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  thread_ids: [String],
});

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
