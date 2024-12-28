const { uploadCategories } = require('../../middlewares/upload-file');
const {
  getCategories,
  postCategory,
  deleteCategory
} = require('../controllers/category-controller');

const categoryRouter = require('express').Router();

categoryRouter.get('/', getCategories);
categoryRouter.post(
  '/createCategory',
  uploadCategories.single('imageUrl'),
  postCategory
);
//TODO PUT
categoryRouter.delete('/deleteCategory/:id', deleteCategory);

module.exports = categoryRouter;
