import Joi from 'joi';
import validationErrorFormatter from './validationErrorFormatter.js';

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
    return validationErrorFormatter.formatJoiErrorResponse(res, error);
  }

  next();
};

export default {
  validateLogin,
};
