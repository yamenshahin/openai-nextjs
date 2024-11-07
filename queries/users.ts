import { User } from '../model/user';
const createUser = async (email: string, password: string) => {
  const user = {
    email,
    password,
  };
  console.log('we are creating a new user');
  try {
    await User.create(user);
  } catch (error) {
    throw new Error(error);
  }
};

export { createUser };
