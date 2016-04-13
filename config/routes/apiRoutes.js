const router = require('express').Router()
const apiController = require('../../controllers/apiController')

router.route('/users/:username')
  .get(apiController.getUser)

router.route('/companies/:name')
  .get(apiController.getCompany)

router.route('/users')
  .get(apiController.getUsers)

router.route('/companies')
  .get(apiController.getCompanies)

module.exports = router
