const createCrudController = require('./controllerFactory')

function validateEmail(input) {
  const errors = []
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (input.email && !emailPattern.test(input.email)) {
    errors.push('email must be a valid email address')
  }

  return errors
}

module.exports = createCrudController({
  table: 'subscriptions',
  type: 'subscription',
  fields: ['name', 'email', 'preference', 'frequency', 'notes'],
  requiredFields: ['name', 'email', 'preference', 'frequency'],
  extraValidate: validateEmail,
})
