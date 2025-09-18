const createApiError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ocorreu um erro interno no servidor.';

  if (process.env.NODE_ENV === 'development') {
    console.error('ERROR 💥:', err);
  }

  res.status(statusCode).json({
    error: {
      message,
      statusCode,
    },
  });
};

export default {
  createApiError,
  errorHandler
}
