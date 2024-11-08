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

export { createUser, getUserById };
