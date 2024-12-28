const { deletefile } = require('../../utils/deletefile');
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
    const newRecipe = new Recipe(req.body);
    if (req.file) {
      newRecipe.imageUrl = req.file.path;
    }
    const recipeSaved = await newRecipe.save();
    return res.status(201).json(recipeSaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//TODO PUT

//TODO
const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeDeleted = await Recipe.findByIdAnd(id);
    if (!recipeDeleted) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    deletefile(recipeDeleted.imageUrl);
    return res.status(204).json({ message: 'Recipe deleted' }, recipeDeleted);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getRecipes, postRecipe, deleteRecipe };
