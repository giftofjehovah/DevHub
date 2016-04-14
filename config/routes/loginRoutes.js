const express = require('express')
const router = express.Router()
const authController = require('../../controllers/authController')

// router.route('/')
//   .get(authenticatedUser, usersController.getUser)

// router.route('/signup')
//   .get(usersController.getSignup)
//   .post(usersController.postSignup)
//

router.get('/login', function (req, res) {
  res.render('login')
})

router.get('/', function (req, res) {
  res.render('home')
})

router.get('/api', function (req,res) {
  res.render('api')
})

router.route('/auth/github')
  .get(authController.getGithubLogin)

router.route('/auth/github/callback')
  .get(authController.githubCallback)

router.route('/logout')
  .get(authController.getLogout)

module.exports = router
