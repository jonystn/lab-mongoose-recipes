const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

const feijoada = {
  title: 'Feijoada',
  ingredients: ['Beans', 'Sausage'],
  creator: 'Jony',
};

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create(feijoada)
      .then((x) => console.log('recipe', x.title))
      .catch((error) =>
        console.log('An error happened while saving a new user:', error)
      );
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((x) => console.log('recipe', x.title))
      .catch((error) =>
        console.log('An error happened while saving a new user:', error)
      );
  })
  // {new: true} updates the page after replace
  .then(() => {
    Recipe.updateOne(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    )
      .then((x) => console.log('Recipe updated'))
      .catch((error) => console.log('Error, recipe not updated', error));
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

// Tip: For now, you might want to comment out any unique requirement from the schema
