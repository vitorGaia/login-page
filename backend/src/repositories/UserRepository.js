import db from '../models/index.js';

const { User } = db;

const createUser = async (userData) => {
  return User.create(userData);
};

const findUserByEmail = async (email) => {
  return User.findOne({ where: { email } });
};

export default {
  createUser,
  findUserByEmail,
};
