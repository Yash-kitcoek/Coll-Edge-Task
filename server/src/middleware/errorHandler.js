export function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
}

export function errorHandler(error, req, res, next) {
  const statusCode = error.statusCode || 500;

  if (error.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: Object.values(error.errors).map((item) => item.message)
    });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Invalid task id" });
  }

  return res.status(statusCode).json({
    message: error.message || "Something went wrong"
  });
}
