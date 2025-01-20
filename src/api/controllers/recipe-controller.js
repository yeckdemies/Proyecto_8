const mongoose = require('mongoose');
const { deletefile } = require('../../utils/deletefile');
const Recipe = require('../models/recipe-model');
const Category = require('../models/category-model');

const getRecipes = async (req, res, next) => {
  try {
    const recipes = await Recipe.find().populate('category');
    return res.status(200).json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const postRecipe = async (req, res, next) => {
  try {
    const { name, description, category } = req.body;

    if (!name || !description || !category) {
      return res
        .status(400)
        .json({ error: 'Name, description, and category are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ error: 'Invalid category ID.' });
    }

    const categoryExists = await Category.findById(category);
    if (!categoryExists) {
      return res.status(404).json({ error: 'Category not found.' });
    }

    const newRecipe = new Recipe({
      name,
      description,
      category
    });

    if (req.file) {
      newRecipe.imageUrl = req.file.path;
    } else {
      return res.status(400).json({ error: 'Image is required.' });
    }

    const recipeSaved = await newRecipe.save();
    return res.status(201).json({
      message: 'Recipe created successfully.',
      recipe: recipeSaved
    });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const putRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, category } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID format' });
    }

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
        if (recipeToUpdate.imageUrl) {
          await deletefile(recipeToUpdate.imageUrl);
        }
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

    const updatedRecipe = await recipeToUpdate.save();

    res.status(200).json({
      message: 'Recipe modified successfully',
      recipe: updatedRecipe
    });
  } catch (error) {
    console.error('Error updating recipe:', error);
    return res.status(500).json({ error: 'Error updating recipe' });
  }
};

const deleteRecipe = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid recipe ID format' });
    }

    const recipeDeleted = await Recipe.findByIdAndDelete(id);
    if (!recipeDeleted) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    if (recipeDeleted.imageUrl) {
      try {
        await deletefile(recipeDeleted.imageUrl);
      } catch (fileError) {
        console.error('Error deleting the image file:', fileError);
      }
    }

    return res
      .status(200)
      .json({ mmessage: 'Recipe deleted successfully', recipe: recipeDeleted });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getRecipes, postRecipe, deleteRecipe, putRecipe };
