// middleware/auth.js (example implementation - ensure user object is attached to req)
const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = function(role) {
  return async function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user;

      // Fetch full user info including role from DB if needed
      const userFromDb = await User.findById(req.user.id);
      if (!userFromDb) return res.status(401).json({ msg: 'User not found' });
      req.user.role = userFromDb.role;

      if (role && req.user.role !== role && !(Array.isArray(role) && role.includes(req.user.role))) {
        return res.status(403).json({ msg: 'Access denied' });
      }

      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ msg: 'Token is not valid' });
    }
  }
}
