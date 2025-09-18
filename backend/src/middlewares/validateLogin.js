import Joi from 'joi';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'O campo "email" deve ser um email válido',
    'any.required': 'O campo "email" é obrigatório',
  }),
  password: Joi.string().required().messages({
    'any.required': 'O campo "password" é obrigatório',
  }),
});

const validateLogin = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    // No login, geralmente é melhor retornar um erro genérico 401,
    // mas para o desafio, retornar o erro específico do Joi está bom.
    return res.status(400).json({ errors: error.details.map((e) => e.message) });
  }

  next();
};

export default {
  validateLogin,
};
