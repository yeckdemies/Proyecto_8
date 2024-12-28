const mongoose = require('mongoose');
const Category = require('../api/models/category-model');
const Recipe = require('../api/models/recipe-model');
const connectDB = require('../config/db');
require('dotenv').config();

mongoose
  .connect(
    'mongodb+srv://admin:5xRhjDK2rLbedenN@cluster0.ufge1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch((err) => console.error('Error conectando a MongoDB:', err));

const categoriesData = [
  {
    name: 'Postres',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/postres.jpg'
  },
  {
    name: 'Entrantes',
    imageUrl:
      'https://res.cloudinary.com/demo/image/upload/v12345/entrantes.jpg'
  },
  {
    name: 'Platos principales',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/platos.jpg'
  }
];

const recipesData = [
  {
    name: 'Tarta de queso',
    description: 'Deliciosa tarta de queso al horno.',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/tarta.jpg'
  },
  {
    name: 'Ensalada César',
    description: 'Clásica ensalada con pollo y aderezo César.',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/ensalada.jpg'
  },
  {
    name: 'Lasaña',
    description: 'Lasaña de carne con bechamel.',
    imageUrl: 'https://res.cloudinary.com/demo/image/upload/v12345/lasagna.jpg'
  }
];

const seedDatabase = async () => {
  try {
    await Category.deleteMany();
    await Recipe.deleteMany();

    const categories = await Category.insertMany(categoriesData);
    console.log('Categories created:', categories);

    const recipes = [
      { ...recipesData[0], category: categories[0]._id },
      { ...recipesData[1], category: categories[1]._id },
      { ...recipesData[2], category: categories[2]._id }
    ];

    await Recipe.insertMany(recipes);
    console.log('Recipes created:', recipes);

    console.log('Seed completed');
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
