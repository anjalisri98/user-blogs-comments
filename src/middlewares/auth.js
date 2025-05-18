const jwt = require('jsonwebtoken');
const User = require('../db/models/user'); 
const secretKey = process.env.JWT_SECRET || "vega-6";

const getUserFromDB = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId, is_active: true, is_deleted: false });
    return user;
  } catch (error) {
    console.error('Error fetching user from DB:', error);
    throw new Error('Database query failed.');
  }
};

const authenticateUser = async (req, res, next) => {
  const accessToken = req.headers['access-token'];
  const refreshToken = req.headers['refresh-token'];

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ message: 'Access denied. No tokens provided.' });
  }

  try {
    const decoded = jwt.verify(accessToken, secretKey);
    const user = await getUserFromDB(decoded.user.id);

    if (!user) {
      return res.status(401).json({ message: 'User not found or inactive.' });
    }

    req.user = decoded.user;
    return next();
  } catch (error) {
    // If access token fails, try refresh token
    if (!refreshToken) {
      return res.status(401).json({ message: 'Access denied. Invalid token and no refresh token.' });
    }

    try {
      const decoded = jwt.verify(refreshToken, secretKey);
      const user = await getUserFromDB(decoded.user.id);

      if (!user) {
        return res.status(401).json({ message: 'User not found or inactive.' });
      }

      const newAccessToken = jwt.sign({ user: decoded.user }, secretKey, { expiresIn: '24h' });

      res.setHeader('access-token', newAccessToken);
      res.setHeader('refresh-token', refreshToken);
      res.setHeader('Access-Control-Expose-Headers', 'access-token,refresh-token');

      req.user = decoded.user;
      return next();
    } catch (refreshError) {
      return res.status(400).json({ message: 'Invalid refresh token.' });
    }
  }
};

const findUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const user = await getUserFromDB(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user; // pass user to controller if needed
    next();
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { authenticateUser, findUser };
