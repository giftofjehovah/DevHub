const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  email: String,
  workExp: String,
  education: String,
  location: String,
  rockstar: String,
  activity: String,
  longestStreak: String,
  local: {
    password: String
  },
  github: {
    id: String,
    username: String,
    access_token: String,
    refresh_token: String,
    name: String,
    company: String,
    blog: String,
    bio: String,
    avatar_url: String,
    languages: [String],
    html_url: String,
    location: String,
    followers: Number,
    disk_usage: Number,
    hireable: Boolean
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
