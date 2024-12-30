const { uploadRecipes } = require('../../middlewares/upload-file');
const {
  getRecipes,
  postRecipe,
  deleteRecipe,
  putRecipe
} = require('../controllers/recipe-controller');

const recipeRouter = require('express').Router();

recipeRouter.get('/', getRecipes);
recipeRouter.post(
  '/createRecipe',
  uploadRecipes.single('imageUrl'),
  postRecipe
);
recipeRouter.put(
  '/updateRecipe/:id',
  uploadRecipes.single('imageUrl'),
  putRecipe
);
recipeRouter.delete('/deleteRecipe/:id', deleteRecipe);

module.exports = recipeRouter;
