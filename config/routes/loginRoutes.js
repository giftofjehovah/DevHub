const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup)

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin)

router.route('/auth/github')
  .get(usersController.getGithubLogin)

router.route('/auth/github/callback')
  .get(usersController.githubCallback)

router.route('/logout')
  .get(usersController.getLogout)

module.exports = router
