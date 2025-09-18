const formatJoiErrorResponse = (res, error) => {
  return res.status(400).json({ errors: error.details.map((e) => e.message) });
};

export default {
  formatJoiErrorResponse,
};
