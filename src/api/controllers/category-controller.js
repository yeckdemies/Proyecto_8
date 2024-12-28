const { deletefile } = require('../../utils/deletefile');
const Category = require('../models/category-model');

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
    console.log('entro aqui');
    if (req.file) {
      newCategory.imageUrl = req.file.path;
    }
    const categorySaved = await newCategory.save();
    return res.status(201).json(categorySaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

//TODO PUT

//TODO delete category in recipe
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await Category.findByIdAndDelete(id);
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

module.exports = { getCategories, postCategory, deleteCategory };
