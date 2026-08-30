const createCrudController = require('./controllerFactory')

module.exports = createCrudController({
  table: 'workshops',
  type: 'workshop',
  fields: ['title', 'category', 'image', 'description', 'price', 'availability', 'date', 'location'],
  requiredFields: ['title', 'category', 'description', 'date'],
})
