// src/v1/user/controller.js
const userService = require('./service');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  try {
    const user = await userService.signup(req.body);
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message || 'Signup failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.login(email, password);

    const token = jwt.sign(
      { user },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(401).json({ message: error.message || 'Login failed' });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userService.getUserById(userId);
    if (!user || user.is_deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { type, blog_id } = req.body;
    const imageUrl = req.file.location;

    const result = await userService.uploadImage(req.user.id, type, blog_id, imageUrl);
    res.status(200).json({ message: `${type} uploaded successfully`, url: result.url });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = {
  signup,
  login,
  getUserDetails,
  uploadImage,
};
