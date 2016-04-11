const express = require('express')
const router = express.Router()

// const usersController = require('../controllers/usersController')
function authenticatedUser (req, res, next) {
  if (req.isAuthenticated()) return next()
  // isAuthenticated is a passport method. if authenticated, proceed

  req.flash('errorMessage', 'Login to view your profile')
  res.redirect('/login')
}

router.route('/user', function (req, res) {
  .get(authenticatedUser, usersController.getUser)
})
