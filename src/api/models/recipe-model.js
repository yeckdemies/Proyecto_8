const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'categories' }
  },
  {
    timestamps: true,
    collection: 'recipes'
  }
);

module.exports = mongoose.model('recipes', recipeSchema, 'recipes');
