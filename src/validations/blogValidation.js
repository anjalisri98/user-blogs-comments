const { body, param } = require("express-validator");

exports.createBlogValidation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("profile_url").optional().isString().withMessage("Profile url should be a valid string")
];

exports.updateBlogValidation = [
  param("id").isMongoId().withMessage("Invalid blog ID"),
  body("title").optional().notEmpty().withMessage("Title cannot be empty"),
  body("description")
    .optional()
    .notEmpty()
    .withMessage("Description cannot be empty"),
];

exports.blogIdValidation = [
  param("id").isMongoId().withMessage("Invalid blog ID"),
];
