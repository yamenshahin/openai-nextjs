const users: {
  email: string;
  password: string;
}[] = [
  {
    email: 'a@example.com',
    password: 'password',
  },
  {
    email: 'b@example.com',
    password: 'password',
  },
  {
    email: 'c@example.com',
    password: 'password',
  },
];

export const getUsersByEmail = (email: string) =>
  users.find((user) => user.email === email);
