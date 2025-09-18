import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import dotenv from 'dotenv';

dotenv.config({ path: '../../.env' });

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('Email já cadastrado');
  }

  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const user = await userRepository.createUser({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

export default {
  registerUser,
};
