const emailToUsername = (email: string) => {
  if (!email) return 'User';
  return email.split('@')[0];
};

const findIndexOfThread = (array: unknown[], id: string) => {
  if (!array) return -1;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return array.findIndex((obj) => obj.threadId === id);
};

export { emailToUsername, findIndexOfThread };
