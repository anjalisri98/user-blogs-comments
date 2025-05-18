const express = require('express');
const router = express.Router();
const blogRoutes = require('../v1/blog/route');

router.use('/blogs', blogRoutes);

module.exports = router;