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
    const category = new Category(req.body);
    const categorySaved = await category.save();
    return res.status(201).json(categorySaved);
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { getCategories, postCategory };
