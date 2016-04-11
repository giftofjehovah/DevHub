// INDEX
const router = require('express').Router()

const companiesController = require('../controllers/companiesController')

router.route('/').get(companiesController.getAll)

router.route('/:id').get(companiesController.getCompany)

module.exports = router
