const passport = require('passport')

// GET /local/signup
function getSignup (req, res) {
  //    console.log("helo!")
  res.render('signup', {message: req.flash('errorMessage')})
}
// POST /local/signup
function postSignup (req, res) {
  var signupStrategy = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
  })

  return signupStrategy(req, res)
}

// GET /local/login
function getLogin (req, res) {
  res.render('login', {message: req.flash('errorMessage')})
}

// POST /local/login
function postLogin (req, res) {
  var loginStrategy = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })

  return loginStrategy(req, res)
}

// GET /logout
function getLogout (req, res) {
  req.logout()
  res.redirect('/')
}

// GET /auth/github
function getGithubLogin (req, res) {
  return passport.authenticate('github', {scope: ['user', 'repo']})(req, res)
}

// GET /auth/github/callback
function githubCallback (req, res) {
  // var gitHubCallback =
  return passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/' })(req, res)
  // gitHubCallback(req, res)
}

// Restricted page
function getUser (req, res) {
  res.render('user', {message: req.flash('errorMessage')})
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  getUser: getUser,
  getGithubLogin: getGithubLogin,
  githubCallback: githubCallback
}
