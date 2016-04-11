const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')

// const usersController = require('../controllers/usersController')
function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  req.flash('errorMessage', 'Login to view your profile')
  res.redirect('/login')
}

router.route('/')
  .get(authenticatedUser, usersController.getUser)

module.exports = router
