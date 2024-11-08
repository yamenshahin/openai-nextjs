const emailToUsername = (email) => {
  return email.split('@')[0];
};

export { emailToUsername };
