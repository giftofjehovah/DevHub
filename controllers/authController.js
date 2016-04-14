const passport = require('passport')
const User = require('../models/user')

function getGithubLogin (req, res) {
  return passport.authenticate('github', {scope: ['user', 'repo']})(req, res)
}
// GET /auth/github/callback
function githubCallback (req, res) {
  return passport.authenticate('github', function (err, user, info) {
    if (err) throw err
    req.logIn(user, function (err) {
      if (err) throw err
      return res.redirect('/users/' + user.github.username)
    })
  })(req, res)
}

// GET /logout
function getLogout (req, res) {
  req.logout()
  res.redirect('/')
}
module.exports = {
  getLogout: getLogout,
  getGithubLogin: getGithubLogin,
  githubCallback: githubCallback
}
