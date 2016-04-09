const express = require('express')
const app = express()
const path = require('path')
const logger = require('morgan')
const mongoose = require('mongoose')

const mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/devhub'
const port = process.env.PORT || 3000
mongoose.connect(mongoUri)
app.listen(port)
// add code here
app.use(logger('dev'))

app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.status(200).send('Hello World')
})
