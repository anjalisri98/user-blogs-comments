const express = require("express");
const router = express.Router();
const blogController = require("./controller");
const Auth = require("../../middlewares/auth");

//for creating blogs
router.post(
  "/create",
  Auth.authenticateUser,
  Auth.findUser,
  blogController.createBlog
);

//for fetching all blogs
router.get("/get", blogController.getBlogs);

//for details of particular blog
router.get("/details/:id", blogController.getBlogById);

//for updating blog
router.put(
  "/update/:id",
  Auth.authenticateUser,
  Auth.findUser,
  blogController.updateBlog
);

//for deleting blog
router.delete(
  "/delete/:id",
  Auth.authenticateUser,
  Auth.findUser,
  blogController.deleteBlog
);

module.exports = router;
