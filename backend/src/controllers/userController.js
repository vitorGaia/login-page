import userService from '../services/UserService.js';

const register = async (req, res, next) => {
  try {
    const user = await userService.registerUser(req.body);
    res.status(201).json({ message: 'Usuário criado com sucesso', userId: user.id });
  } catch (error) {
    next(error);
  }
};

export default {
  register,
};
