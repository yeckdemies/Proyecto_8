const {
  getCategories,
  postCategory
} = require('../controllers/category-controller');

const categoryRouter = require('express').Router();

categoryRouter.get('/', getCategories);
categoryRouter.post('/createCategory', postCategory);

module.exports = categoryRouter;
