const Blog = require("../../db/models/blog");
const User = require('../../db/models/user');


const create = async (data, userId) => {
  try {
    const blog = new Blog({ ...data, userId });
    return await blog.save();
  } catch (err) {
    throw new Error("Failed to create blog: " + err.message);
  }
};

const getAll = async () => {
  try {
     return await Blog.find().sort({ createdAt: -1 });
  } catch (err) {
    throw new Error("Failed to fetch blogs: " + err.message);
  }
};

const getById = async (id) => {
  try {
    const blog = await Blog.findOne({ _id: id });
    return blog;
  } catch (err) {
    throw new Error("Failed to get blog by ID: " + err.message);
  }
};

const update = async (id, data, userId) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate({ _id: id, userId }, data, { new: true });
    return updatedBlog;
  } catch (err) {
    throw new Error("Failed to update blog: " + err.message);
  }
};

const remove = async (id, userId) => {
  try {
    await Blog.findByIdAndDelete({ _id: id, userId });
  } catch (err) {
    throw new Error("Failed to delete blog: " + err.message);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
