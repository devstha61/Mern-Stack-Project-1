import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  // Get the token from Authorization header (format: "Bearer <token>")
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You now have access to user data in `req.user`
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token.', error: error.message });
  }
}
