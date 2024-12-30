require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const recipeRouter = require('./src/api/routes/recipe-router');
const categoryRouter = require('./src/api/routes/category-router');
const cloudinary = require('cloudinary').v2;

const app = express();

app.use(express.json());

connectDB();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/recipes', recipeRouter);

app.use('*', (req, res, next) => {
  return res.status(404).json('Route not found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
