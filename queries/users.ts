import { findIndexOfThread } from '@/util/helper';
import { User } from '../model/user';
const createUser = async (email: string, password: string) => {
  const user = {
    email,
    password,
  };
  try {
    await User.create(user);
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async (id: string) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(error);
  }
};

const addUserThread = async (
  userId: string,
  thread: { threadId: string; threadTitle: string },
) => {
  console.log(userId, thread);
  try {
    const user = await User.findById(userId);
    if (!user) throw new Error('User not found');
    if (!user.thread) user.thread = [];
    const indexOfThread = findIndexOfThread(user.thread, thread.threadId);
    console.log(indexOfThread);
    if (indexOfThread === -1) user.thread.push(thread);
    await user.save();
  } catch (error) {
    throw new Error(error);
  }
};
export { createUser, getUserById, getUserByEmail, addUserThread };
