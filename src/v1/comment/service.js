// src/v1/comment/service.js
const Comment = require("../../db/Comment");

const createComment = async (data) => {
  try {
    return await Comment.create(data);
  } catch (error) {
    return { error: error.message };
  }
};

const getCommentsByBlogId = async (blogId) => {
  try {
    return await Comment.find({ blog_id: blogId })
      .populate("user_id", "email profile_url")
      .lean();
  } catch (error) {
    return { error: error.message };
  }
};

module.exports = {
  createComment,
  getCommentsByBlogId,
};
