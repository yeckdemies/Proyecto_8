const { getRecipes, postRecipe } = require('../controllers/recipe-controller');

const recipeRouter = require('express').Router();

recipeRouter.get('/', getRecipes);
recipeRouter.post('/createRecipe', postRecipe);

module.exports = recipeRouter;
