const db = require('../database/db')
const createCrudController = require('./controllerFactory')

function validateReview(input) {
  const errors = []
  const rating = Number(input.rating)

  if (!input.reviewerName || String(input.reviewerName).trim() === '') {
    errors.push('reviewerName is required')
  }

  if (!input.comment || String(input.comment).trim() === '') {
    errors.push('comment is required')
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    errors.push('rating must be an integer between 1 and 5')
  }

  if (!input.itemType || !input.itemId) {
    errors.push('itemType and itemId are required')
  }

  return errors
}

const reviewController = createCrudController({
  table: 'reviews',
  type: 'review',
  fields: ['reviewerName', 'rating', 'comment', 'itemType', 'itemId', 'itemTitle'],
  requiredFields: ['reviewerName', 'rating', 'comment', 'itemType', 'itemId'],
  extraValidate: validateReview,
})

const selectByItem = db.prepare('SELECT * FROM reviews WHERE itemType = ? AND itemId = ? ORDER BY created_at DESC')
const baseGetAll = reviewController.getAll

reviewController.getAll = (req, res) => {
  const { itemType, itemId } = req.query

  if (itemType && itemId) {
    const rows = selectByItem.all(itemType, itemId)
    return res.json({
      success: true,
      count: rows.length,
      data: rows,
    })
  }

  return baseGetAll(req, res)
}

module.exports = reviewController
