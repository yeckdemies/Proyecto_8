const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    imageUrl: { type: String, required: true }
  },
  {
    timestamps: true,
    collection: 'categories'
  }
);

module.exports = mongoose.model('categories', categorySchema, 'categories');
