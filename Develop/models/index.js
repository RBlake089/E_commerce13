// Import models
const Product = require('./Product'); // Import the Product model
const Category = require('./Category'); // Import the Category model
const Tag = require('./Tag'); // Import the Tag model
const ProductTag = require('./ProductTag'); // Import the ProductTag model

// Define associations

// Establish a one-to-many relationship:
// A product belongs to a category (via foreign key 'category_id')
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Column in the Product model representing the foreign key
});

// A category has many products associated with it (via foreign key 'category_id')
Category.hasMany(Product, {
  foreignKey: 'category_id', // Column in the Product model representing the foreign key
});

// Establish a many-to-many relationship using a junction table (ProductTag):
// A product can belong to many tags and a tag can be associated with many products
Product.belongsToMany(Tag, {
  through: ProductTag, // Junction table model
  foreignKey: 'product_id', // Column in the junction table referencing the Product model
});

// A tag can be associated with many products through the junction table (ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // Junction table model
  foreignKey: 'tag_id', // Column in the junction table referencing the Tag model
});

// Export the models and associations
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
