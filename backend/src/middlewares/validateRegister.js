import Joi from 'joi';

const registerSchema = Joi.object({
  name: Joi.string().min(5).required().messages({
    'string.min': '"name" deve ter no mínimo 5 caracteres',
    'any.required': '"name" é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': '"email" deve ser um email válido',
    'any.required': '"email" é obrigatório',
  }),
  password: Joi.string().min(5).required().messages({
    'string.min': '"password" deve ter no mínimo 5 caracteres',
    'any.required': '"password" é obrigatório',
  }),
});

const validateRegister = (req, res, next) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({ errors: error.details.map(e => e.message) });
  }
  next();
};

export default {
  validateRegister,
};
