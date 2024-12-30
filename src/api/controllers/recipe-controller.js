const mongoose = require('mongoose');
const { deletefile } = require('../../utils/deletefile');
const Recipe = require('../models/recipe-model');
const Category = require('../models/category-model');

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
    const { category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

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

const putRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    const recipeToUpdate = await Recipe.findById(id);

    if (!recipeToUpdate) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (name) {
      recipeToUpdate.name = name;
    }

    if (description) {
      recipeToUpdate.description = description;
    }

    if (req.file) {
      try {
        await deletefile(recipeToUpdate.imageUrl);
        recipeToUpdate.imageUrl = req.file.path;
      } catch (deleteError) {
        console.error('Error deleting the old image:', deleteError);
      }
    }

    if (category) {
      if (!mongoose.Types.ObjectId.isValid(category)) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }
      const categoryExists = await Category.findById(category);

      if (!categoryExists) {
        return res.status(400).json({ error: 'Invalid category ID' });
      }

      recipeToUpdate.category = category;
    }

    await recipeToUpdate.save();

    res.status(200).json({
      message: 'Recipe modified successfully',
      recipe: recipeToUpdate
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error updating recipe' });
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const recipeDeleted = await Recipe.findByIdAndDelete(id);
    if (!recipeDeleted) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    deletefile(recipeDeleted.imageUrl);
    return res
      .status(200)
      .json({ message: 'Recipe deleted', recipe: recipeDeleted });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getRecipes, postRecipe, deleteRecipe, putRecipe };
