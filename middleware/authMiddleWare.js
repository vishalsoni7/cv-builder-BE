const jwt = require("jsonwebtoken");
const {
  AUTH_MIDDLEWARE_HEADER,
  AUTH_TOKEN_DENIED,
  INVALID_TOKEN_ERROR,
} = require("../constant/message");
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Middleware to authenticate user requests using JWT.
 */
const authMiddleware = (req, res, next) => {
  const token = req.header(AUTH_MIDDLEWARE_HEADER)?.split(" ")[1]; // Extract Bearer token

  if (!token) {
    return res.status(401).json({ message: AUTH_TOKEN_DENIED });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attaching user payload to request
    next(); // Proceed to the next middleware/controller
  } catch (error) {
    return res.status(401).json({ message: INVALID_TOKEN_ERROR });
  }
};

module.exports = {
  authMiddleware,
};
