import bcrypt from 'bcrypt';
import userRepository from '../repositories/UserRepository.js';
import errorMiddleware from '../middlewares/errorMiddleware.js';

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw errorMiddleware.createApiError(409, 'Este e-mail já está em uso.');
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
