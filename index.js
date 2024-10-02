const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const Product = require('./models/product')
const Category = require('./models/category')

const PORT = 3000;

// Middlewares
app.use(express.json()); 

// Routes
app.use('/products', productRoutes); 
app.use('/categories', categoryRoutes)

// DB Config


Product.belongsToMany(Category, {through:'ProductCategory'})
Category.belongsToMany(Product, {through:'ProductCategory'})
sequelize.authenticate()
  .then(() => console.log('Successful connection to db'))
  .catch(err => console.error('Failed connection to db', err));
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => console.error('Database sync is failed', err));


// Start the server
app.listen(PORT, () => {
  console.log("Server is running at: ", PORT);
});