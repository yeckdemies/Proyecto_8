const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true } // URL de Cloudinary
});

module.exports = mongoose.model('Category', categorySchema);
