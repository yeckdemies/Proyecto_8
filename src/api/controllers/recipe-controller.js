const Recipe = require('../models/recipe-model');

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate('category');
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postRecipe = async (req, res, next) => {
  try {
    const recipe = new Recipe(req.body);
    const recipeSaved = await recipe.save();
    return res.status(201).json(recipeSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getRecipes, postRecipe };
