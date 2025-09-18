import jwt from 'jsonwebtoken';
import errorMiddleware from './errorMiddleware.js';
import db from '../models/index.js';

const { User } = db;

const authMiddleware = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return next(errorMiddleware.createApiError(401, 'Token não fornecido'));
  }

  const token = authorization.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      return next(errorMiddleware.createApiError(401, 'Usuário do token não encontrado'));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(errorMiddleware.createApiError(401, 'Token inválido ou expirado'));
  }
};

export default {
  authMiddleware,
};
