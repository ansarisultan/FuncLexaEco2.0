export const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || (typeof error.status === 'number' ? error.status : 500);
  const message = error.message || 'Internal server error';

  res.status(status).json({
    success: false,
    message,
  });
};
