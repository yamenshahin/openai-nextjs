import { findIndexOfThread } from '@/util/helper';
import { User } from '../model/user';
const createUser = async (email: string, password: string) => {
  const user = {
    email,
    password,
  };
  try {
    await User.create(user);
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};

const addUserThread = async (
  userId: string,
  thread: { threadId: string; threadTitle: string },
) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    if (!user.threads) user.threads = [];
    const indexOfThread = findIndexOfThread(user.threads, thread.threadId);
    if (indexOfThread === -1) user.threads.push(thread);
    await user.save();
  } catch (error: unknown) {
    throw new Error(error as string);
  }
};
export { createUser, getUserById, getUserByEmail, addUserThread };
