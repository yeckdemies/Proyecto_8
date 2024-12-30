const { uploadCategories } = require('../../middlewares/upload-file');
const {
  getCategories,
  postCategory,
  deleteCategory,
  putCategory
} = require('../controllers/category-controller');

const categoryRouter = require('express').Router();

categoryRouter.get('/', getCategories);
categoryRouter.post(
  '/createCategory',
  uploadCategories.single('imageUrl'),
  postCategory
);
categoryRouter.put(
  '/updateCategory/:id',
  uploadCategories.single('imageUrl'),
  putCategory
);
categoryRouter.delete('/deleteCategory/:id', deleteCategory);

module.exports = categoryRouter;
