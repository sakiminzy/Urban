const express = require('express')
const reviewsController = require('../controllers/reviewsController')

const router = express.Router()

router.get('/', reviewsController.getAll)
router.get('/:id', reviewsController.getById)
router.post('/', reviewsController.create)
router.put('/:id', reviewsController.update)
router.delete('/:id', reviewsController.remove)

module.exports = router
