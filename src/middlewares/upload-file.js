const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storageCategories = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'categories',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'svg']
  }
});

const storageRecipes = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipes',
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'svg']
  }
});

const uploadCategories = multer({ storage: storageCategories });
const uploadRecipes = multer({ storage: storageRecipes });

module.exports = { uploadCategories, uploadRecipes };
