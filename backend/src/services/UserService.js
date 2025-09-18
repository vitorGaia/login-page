import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
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

const loginUser = async ({ email, password }) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw errorMiddleware.createApiError(401, 'Credenciais inválidas');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw errorMiddleware.createApiError(401, 'Credenciais inválidas');
  }

  const payload = { id: user.id, email: user.email };
  const secret = process.env.JWT_SECRET;
  const options = { expiresIn: '1d' };

  const token = jwt.sign(payload, secret, options);

  return { token };
};

export default {
  registerUser,
  loginUser,
};
