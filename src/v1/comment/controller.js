// src/v1/comment/controller.js
const commentService = require("./service");

const createComment = async (req, res) => {
  const { blog_id, content, parent_comment } = req.body;
  const user_id = req.user.id;

  const result = await commentService.createComment({
    blog_id,
    user_id,
    content,
    parent_comment,
  });

  if (result?.error) return res.status(400).json({ message: result.error });

  res.status(201).json({ message: "Comment added", comment: result });
};

const getComments = async (req, res) => {
  const { blogId } = req.params;
  const result = await commentService.getCommentsByBlogId(blogId);

  if (result?.error) return res.status(400).json({ message: result.error });

  res.status(200).json(result);
};

module.exports = { createComment, getComments };
