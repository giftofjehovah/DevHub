const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')

const userSchema = mongoose.Schema({
  local: {
    email: String,
    password: String,
  }
})

userSchema.statics.encrypt = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}
// instance method, (vs statics) must have a specific user's password

module.exports = mongoose.model('User', userSchema)
