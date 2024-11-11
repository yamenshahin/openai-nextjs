const emailToUsername = (email: string) => {
  return email.split('@')[0];
};

const findIndexOfThread = (array: unknown[], id: string) => {
  if (!array) return -1;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  return array.findIndex((obj) => obj.threadId === id);
};

export { emailToUsername, findIndexOfThread };
