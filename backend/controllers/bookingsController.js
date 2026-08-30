const createCrudController = require('./controllerFactory')

function validateEmail(input) {
  const errors = []
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (input.email && !emailPattern.test(input.email)) {
    errors.push('email must be a valid email address')
  }

  return errors
}

function transformBooking(body) {
  return {
    ...body,
    bookingDate: body.bookingDate || body.bookingDateTime || body.itemDate || '',
  }
}

module.exports = createCrudController({
  table: 'bookings',
  type: 'booking',
  fields: ['name', 'email', 'itemType', 'itemId', 'itemTitle', 'bookingDate', 'notes'],
  requiredFields: ['name', 'email'],
  idSourceField: null,
  transformInput: transformBooking,
  extraValidate: validateEmail,
})
