const express = require('express')
const bookingsController = require('../controllers/bookingsController')

const router = express.Router()

router.get('/', bookingsController.getAll)
router.get('/:id', bookingsController.getById)
router.post('/', bookingsController.create)
router.put('/:id', bookingsController.update)
router.delete('/:id', bookingsController.remove)

module.exports = router
