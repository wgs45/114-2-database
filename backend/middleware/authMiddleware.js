const jwt = require("jsonwebtoken"); // Import JSON Web Token for verifying tokens

// Middleware to protect routes: ensures user is authenticated
const requireAuth = (req, res, next) => {
  const auth = req.headers.authorization; // Get token from Authorization header

  // If no token or format is invalid
  if (!auth || !auth.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Extract token string after "Bearer "
  const token = auth.split(" ")[1];

  try {
    // Verify token using JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (like id, is_admin, etc.) to the request object
    req.user = decoded;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" }); // Token is invalid or expired
  }
};

// Middleware to allow only admin users
const requireAdmin = (req, res, next) => {
  // Check if the user is admin (this info should be in the decoded token)
  if (!req.user?.is_admin) return res.status(403).json({ error: "Forbidden" }); // Access denied for non-admins

  next(); // User is admin, continue
};

// Middleware to verify token without enforcing roles (generic use)
const verifyToken = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header("Authorization")?.split(" ")[1];

  // If token is missing
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Save decoded data to request for further use
    req.user = decoded;

    next(); // Continue to next middleware or route
  } catch (err) {
    res.status(400).json({ message: "Invalid token" }); // Invalid token format or expired
  }
};

module.exports = {
  requireAuth,
  requireAdmin,
  verifyToken,
};
