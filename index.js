const express = require('express');
const app = express();
const sequelize = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const basketItemRoutes = require('./routes/basketItemRoutes');
const basketRoutes = require('./routes/basketRoutes');
const exceptionHandler = require('./middlewares/exceptionHandler');
const Product = require('./models/product');
const Category = require('./models/category');
const User = require('./models/user');
const Basket = require('./models/basket');
const BasketItem = require('./models/basketItem');

const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(exceptionHandler);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/basketItems', basketItemRoutes);
app.use('/api/baskets', basketRoutes);

// DB Config
User.hasOne(Basket, { foreignKey: 'userId' });
Basket.belongsTo(User, { foreignKey: 'userId' });

Basket.hasMany(BasketItem, { foreignKey: 'basketId' });
BasketItem.belongsTo(Basket, { foreignKey: 'basketId' });

Product.hasMany(BasketItem, { foreignKey: 'productId' })
BasketItem.belongsTo(Product, { foreignKey: 'productId' })

User.hasMany(Product, { foreignKey: 'userId' });
Product.belongsTo(User, { foreignKey: 'userId' });

Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });

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