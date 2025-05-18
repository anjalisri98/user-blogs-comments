const User = require('../../db/models/user');
const Blog = require('../blog/service');
const bcrypt = require('bcryptjs');

const signup = async (data) => {
  try {
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) throw new Error('User already exists');

    const hashedPassword = await bcrypt.hash(data.password, 10);
    data.password = hashedPassword;
    return await User.create(data);
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email, is_deleted: false });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    return user;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
   const user = await User.findById(id)
      .populate({
        path: 'blogs',
        model: 'Blog',
        select: 'title content created_at',
      })
      .lean();

    if (!user) throw new Error('User not found');
  } catch (error) {
    throw new Error(error.message);
  }
};

const uploadImage = async (userId, type, blogId, imageUrl) => {
  try {
    if (type === 'profile_image') {
      const user = await User.findByIdAndUpdate(userId, { profile_url: imageUrl }, { new: true });
      if (!user) return { error: 'User not found' };
      return { data: { type, url: imageUrl } };
    }

    if (type === 'blog_image') {
      if (!blogId) return { error: 'blog_id is required' };
      const blog = await Blog.findByIdAndUpdate(blogId, { image_url: imageUrl }, { new: true });
      if (!blog) return { error: 'Blog not found' };
      return { data: { type, url: imageUrl } };
    }

    return { error: 'Invalid type. Use profile_image or blog_image' };
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  signup,
  login,
  getUserById,
  uploadImage,
};

