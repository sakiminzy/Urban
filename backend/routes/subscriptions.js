const express = require('express')
const subscriptionsController = require('../controllers/subscriptionsController')

const router = express.Router()

router.get('/', subscriptionsController.getAll)
router.get('/:id', subscriptionsController.getById)
router.post('/', subscriptionsController.create)
router.put('/:id', subscriptionsController.update)
router.delete('/:id', subscriptionsController.remove)

module.exports = router
