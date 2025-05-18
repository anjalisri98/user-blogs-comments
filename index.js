const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const routes = require('./src/routes/routes');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config(); // Always at the top
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URL;

console.log("Mongo URI:", uri); // Debug

// mongoose.connect(uri)
//   .then(() => console.log("MongoDB Connected"))
//   .catch((err) => console.log("MongoDB Error:", err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));