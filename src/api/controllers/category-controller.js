const { deletefile } = require('../../utils/deletefile');
const Category = require('../models/category-model');
const Recipe = require('../models/recipe-model');
const mongoose = require('mongoose');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories.length) {
      return res.status(404).json({ message: 'No categories found' });
    }
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const postCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);

    if (!req.body.name || typeof req.body.name !== 'string') {
      return res
        .status(400)
        .json({ message: 'The name field is required and must be a string.' });
    }

    if (req.file) {
      newCategory.imageUrl = req.file.path;
    }
    const categorySaved = await newCategory.save();
    return res.status(201).json(categorySaved);
  } catch (error) {
    console.error('Error saving category:', error);
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const putCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid category ID format' });
    }

    const categoryToUpdate = await Category.findById(id);
    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Category not found' });
    }

    if (name && typeof name !== 'string') {
      return res.status(400).json({ error: 'Name must be a string' });
    }

    if (name) {
      categoryToUpdate.name = name;
    }

    if (req.file) {
      try {
        if (categoryToUpdate.imageUrl) {
          await deletefile(categoryToUpdate.imageUrl);
        }
        categoryToUpdate.imageUrl = req.file.path;
      } catch (deleteError) {
        console.error('Error deleting the old image:', deleteError);
      }
    }

    await categoryToUpdate.save();

    res.status(200).json({
      message: 'Category modified successfully',
      category: categoryToUpdate
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid category ID format' });
    }

    const categoryDeleted = await Category.findByIdAndDelete(id);

    if (!categoryDeleted) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const updateResult = await Recipe.updateMany(
      { category: id },
      { $set: { category: null } }
    );

    if (updateResult.modifiedCount === 0) {
      console.warn('No recipes were updated during category deletion');
    }

    if (categoryDeleted.imageUrl) {
      try {
        deletefile(categoryDeleted.imageUrl);
      } catch (deleteError) {
        console.error('Error deleting the image file:', deleteError);
      }
    }

    return res
      .status(200)
      .json({ message: 'Category deleted', category: categoryDeleted });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getCategories, postCategory, deleteCategory, putCategory };
