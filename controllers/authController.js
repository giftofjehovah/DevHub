const passport = require('passport')
const createProfile = require('./createProfile')

function getGithubLogin (req, res) {
  return passport.authenticate('github', {scope: ['user', 'repo']})(req, res)
}
// GET /auth/github/callback
function githubCallback (req, res) {
  return passport.authenticate('github', function (err, user, info) {
    if (err) throw err
    req.logIn(user, function (err) {
      if (err) throw err
      createProfile(req, res, function () {
        res.redirect('/users/' + user.github.username)
      })
    })
  })(req, res)
}

// GET /logout
function getLogout (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/') // Inside a callback… bulletproof!
  })
}

module.exports = {
  getLogout: getLogout,
  getGithubLogin: getGithubLogin,
  githubCallback: githubCallback
}
