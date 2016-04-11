const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

const GitHubStrategy = require('passport-github').Strategy
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

module.exports = function (passport) {
  // store sessions (serialize & dezerialize)
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      console.log('deserializing user:', user)
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
      if (err) return done(err)
      if (user) {
        return done(null, false, req.flash('errorMessage', 'This email is already used!'))
      } else {
        var newUser = new User()
        newUser.email = email
        newUser.local.password = User.encrypt(password)

        newUser.save(function (err, user) {
          if (err) return done(err)
          return done(null, user)
        })
      }
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, function (req, email, password, done) {
    User.findOne({ 'email': email }, function (err, user) {
      if (err) {
        return done(err)
      }

      if (!user) {
        return done(null, false, req.flash('errorMessage', 'No user found!'))
      }

      if (!user.validPassword(password)) {
        return done(null, false, req.flash('errorMessage', 'Incorrect Password'))
      }

      done(null, user)
    })
  }))

  passport.use('github', new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/github/callback'
  },
    function (access_token, refresh_token, profile, done) {
      User.findOne({ 'email': profile._json.email }, function (err, user) {
        if (err) {
          console.log(err) // handle errors!
        }
        if (!err && user !== null) {
          done(null, user)
        } else {
          // user = new User({
          //   oauthID: profile.id,
          //   name: profile.displayName,
          //   created: Date.now()
          // })
          var newUser = new User()
          newUser.github.id = profile._json.id
          newUser.github.email = profile._json.email
          newUser.github.location = profile._json.location
          newUser.github.hireable = profile._json.hireable
          newUser.github.company = profile._json.company
          newUser.github.blog = profile._json.blog
          newUser.github.bio = profile._json.bio
          newUser.github.avatar_url = profile._json.avatar_url
          newUser.github.html_url = profile._json.html_url
          newUser.github.followers = profile._json.followers
          newUser.github.disk_usage = profile._json.disk_usage
          newUser.github.access_token = access_token
          newUser.github.refresh_token = refresh_token
          newUser.github.name = profile._json.displayName

          newUser.save(function (err) {
            var user = newUser
            console.log('newUser:' + newUser)
            console.log('currentUser: ' + currentUser)
            console.log('user:' + user)
            if (err) {
              console.log(err) // handle errors!
            } else {
              console.log('saving user')
              done(null, user)
            }
            console.log('I am a lamma')
          })
        }
      })
    }
  ))
}
