const { deletefile } = require('../../utils/deletefile');
const Category = require('../models/category-model');
const Recipe = require('../models/recipe-model');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const postCategory = async (req, res, next) => {
  try {
    const newCategory = new Category(req.body);
    if (req.file) {
      newCategory.imageUrl = req.file.path;
    }
    const categorySaved = await newCategory.save();
    return res.status(201).json(categorySaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const putCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const categoryToUpdate = await Category.findById(id);

    if (!categoryToUpdate) {
      return res.status(404).json({ error: 'Categroy not found' });
    }

    if (name) {
      categoryToUpdate.name = name;
    }

    if (req.file) {
      try {
        await deletefile(categoryToUpdate.imageUrl);
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
    return res.status(500).json({ error: 'Error updating category' });
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndDelete(id);
    await Recipe.updateMany({ category: id }, { set: { category: '' } });
    if (!categoryDeleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    deletefile(categoryDeleted.imageUrl);
    return res
      .status(200)
      .json({ message: 'Category deleted', category: categoryDeleted });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getCategories, postCategory, deleteCategory, putCategory };
