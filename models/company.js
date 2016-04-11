const mongoose = require('mongoose')

const CompanySchema = mongoose.Schema({
  name: String,
  image: String,
  industry: [String],
  description: String,
  stack: [String],
  jobs: [String]

})

module.exports = mongoose.model('Company', CompanySchema)
