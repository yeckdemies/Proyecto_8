const { uploadRecipes } = require('../../middlewares/upload-file');
const { getRecipes, postRecipe } = require('../controllers/recipe-controller');

const recipeRouter = require('express').Router();

recipeRouter.get('/', getRecipes);
recipeRouter.post(
  '/createRecipe',
  uploadRecipes.single('imageUrl'),
  postRecipe
);
//TODO PUT
//TODO Delete

module.exports = recipeRouter;
