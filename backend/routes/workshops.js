const express = require('express')
const workshopsController = require('../controllers/workshopsController')

const router = express.Router()

router.get('/', workshopsController.getAll)
router.get('/:id', workshopsController.getById)
router.post('/', workshopsController.create)
router.put('/:id', workshopsController.update)
router.delete('/:id', workshopsController.remove)

module.exports = router
