const blogService = require("./service");

const createBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const blog = await blogService.create(req.body, userId);
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogs = async (req, res) => {
  try {
    const blogs = await blogService.getAll();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBlogById = async (req, res) => {
  try {
    const blog = await blogService.getById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    const updatedBlog = await blogService.update(req.params.id, req.body, userId);
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const userId = req.user.id;
    await blogService.remove(req.params.id, userId);
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};
