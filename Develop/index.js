const express = require('express');
const sequelize = require('./config/connection');
const Category = require('./models/Category');
const Product = require('./models/Product');
const Tag = require('./models/Tag');
const ProductTag = require('./models/ProductTag');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up associations
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id',
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id',
});

// Include your API routes
const apiRoutes = require('./routes/api-routes');
app.use('/api', apiRoutes);

// Sync models with the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
});
