const User = require('../models/user')

function showUser (req, res) {
  const username = req.params.username

  User.find({'github.username': username}, function (err, user) {
    if (err) console.log(err)
    res.render('userProfile', {user: user})
  })
}

function indexUsers (req, res) {
  User.find(function (err, users) {
    if (err) console.log(err)
    res.render('users', {users: users})
  })
}

function updateUser (req, res) {
  const username = req.params.username

  User.findOneAndUpdate({'github.username': username}, {workExp: req.body.workExp, education: req.body.education}, {}, function (err, user) {
    if (err) console.log(err)
    res.redirect('/users/' + username)
  })
}

function editUser (req, res) {
  const username = req.params.username

  User.find({'github.username': username}, function (err, user) {
    if (err) console.log(err)
    res.render('userForm', {user: user})
  })
}

module.exports = {
  showUser: showUser,
  indexUsers: indexUsers,
  updateUser: updateUser,
  editUser: editUser
}
// GET /local/signup
// function getSignup (req, res) {
//   //    console.log("helo!")
//   res.render('signup', {message: req.flash('errorMessage')})
// }
// POST /local/signup
// function postSignup (req, res) {
//   var signupStrategy = passport.authenticate('local-signup', {
//     successRedirect: '/',
//     failureRedirect: '/signup',
//     failureFlash: true
//   })
//
//   return signupStrategy(req, res)
// }

// GET /local/login
// function getLogin (req, res) {
//   res.render('login', {message: req.flash('errorMessage')})
// }

// POST /local/login
// function postLogin (req, res) {
//   var loginStrategy = passport.authenticate('local-login', {
//     successRedirect: '/',
//     failureRedirect: '/login',
//     failureFlash: true
//   })
//
//   return loginStrategy(req, res)
// }

// Restricted page - OWN PROFILE
// function getUser (req, res) {
//   res.render('user', {message: req.flash('errorMessage')})
// }
