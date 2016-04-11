// INDEX
const router = require('express').Router()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')

const companiesController = require('../controllers/companiesController')

router.route('/companies').get(companiesController.getAll)

router.route('/companies/:id').get(companiesController.getCompany)

module.exports = router
