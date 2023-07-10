import isEmail from 'validator/lib/isEmail';

const validateEmail = (email: string) => {
  if (!email) throw new Error('No email supplied');

  if (isEmail(email)) {
    return true;
  } else throw new Error('Email does not match required format');
};

export default validateEmail;
