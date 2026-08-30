const createCrudController = require('./controllerFactory')

module.exports = createCrudController({
  table: 'products',
  type: 'product',
  fields: ['title', 'category', 'image', 'description', 'price', 'availability'],
  requiredFields: ['title', 'category', 'description', 'price'],
})
