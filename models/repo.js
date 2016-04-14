const mongoose = require('mongoose')
const repoSchema = mongoose.Schema({
  name: String,
  description: String,
  languages: [String]
})

module.exports = mongoose.model('Repo', repoSchema)
