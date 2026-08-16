export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
};

export const errorHandler = (err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.statusCode || 500).json({
    success: false,
    message:
      err.statusCode && err.statusCode < 500
        ? err.message
        : "Something went wrong. Please try again.",
  });
};