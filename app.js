require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const ejsLayouts = require('express-ejs-layouts')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const methodOverride = require('method-override')

const GitHubStrategy = require('passport-github').Strategy
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET

const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/devhub'
const port = process.env.PORT || 3000
mongoose.connect(mongoUri)
app.listen(port, function () {
  console.log('server listening on port ' + port)
})

if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}
// add code here
app.use(logger('dev'))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser())
app.use(session({secret: process.env.SESSIONSECRET}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use(methodOverride(function (request, response) {
  if (request.body && typeof request.body === 'object' && '_method' in request.body) {
    var method = request.body._method
    delete request.body._method
    return method
  }
}))

// Express settings
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

require('./config/passport')(passport)

app.use(function (req, res, next) {
  global.currentUser = req.user
  next()
})

app.get('/', function (req, res) {
  res.json({user: req.user})
})

const loginRoutes = require(__dirname + '/config/routes/loginRoutes')
app.use('/', loginRoutes)

const userRoutes = require(__dirname + '/config/routes/userRoutes')
app.use('/user', userRoutes)

const companyRoutes = require(__dirname + '/config/routes/companyRoutes')
app.use('/companies', companyRoutes)
