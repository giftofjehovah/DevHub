const passport = require('passport')

function getGithubLogin (req, res) {
  return passport.authenticate('github', {scope: ['user', 'repo']})(req, res)
}

// GET /auth/github/callback
function githubCallback (req, res) {
  // var gitHubCallback =
  return passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/createprofile' })(req, res)
// gitHubCallback(req, res)
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
