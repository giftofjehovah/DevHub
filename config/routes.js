const express = require('express')
const router = express.Router()
const passport = require('passport')
const usersController = require('../controllers/usersController')
const staticsController = require('../controllers/staticsController')

router.route('/')
  .get(staticsController.home)

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/logout')
  .get(usersController.getLogout)

module.exports = router
