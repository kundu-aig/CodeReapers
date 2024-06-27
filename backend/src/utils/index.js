

/**
 * Send a success response.
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {boolean} success - Success status (default: true)
 * @param {string} message - Response message (default: "Success")
 * @param {Array|Object} data - Response data (default: [])
 * @param {Object} additional - Additional response properties
 * @param {Error|null} error - Error object (default: null)
 */
export const sendSuccessResponse = (
  res,
  statusCode = 200,
  success,
  message,
  data = [],
  additional = {},
  error = null
) => {
  let payload = {
    success: success || true,
    statusCode: statusCode,
    error: error,
    message: message || "Success",
    data: data,
    ...additional,
  };
  res.status(statusCode).send(payload).end();
};

/**
 * Send an error response.
 *
 * @param {Object} res - Express response object
 * @param {number} statusCode - HTTP status code (default: 400)
 * @param {boolean} success - Success status (default: false)
 * @param {Object} err - Error object (default: {})
 * @param {string} errCode - Error code (default: "")
 * @param {Object} data - Additional data in case of an error (default: {})
 */
export const sendErrorResponse = (
  res,
  statusCode = 500,
  success,
  err = {},
  data = {}
) => {
  const errData = {
    success: success || false,
    statusCode: statusCode,
    error: {
      message: err?.message || "Internal Server Error",
      errorDetails: err?.errorDetails || {},
    },
    data: data,
  };

  res.status(statusCode).send(errData).end();
};









