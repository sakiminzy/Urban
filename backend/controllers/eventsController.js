const createCrudController = require('./controllerFactory')

module.exports = createCrudController({
  table: 'events',
  type: 'event',
  fields: ['title', 'category', 'image', 'description', 'price', 'availability', 'date', 'location'],
  requiredFields: ['title', 'category', 'description', 'date'],
})
