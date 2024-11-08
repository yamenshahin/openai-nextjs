const emailToUsername = (email) => {
  return email.split('@')[0];
};

const findIndexOfThread = (array, id) => {
  if (!array) return -1;
  return array.findIndex((obj) => obj.threadId === id);
};

export { emailToUsername, findIndexOfThread };
