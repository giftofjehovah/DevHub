const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
  email: String,
  profiled: Boolean,
  workExp: {
    company: String,
    position: String,
    start_work: Date,
    end_work: Date
  },
  education: {
    school: String,
    course: String,
    start_edu: Date,
    end_edu: Date
  },
  local: {
    password: String
  },
  github: {
    id: String,
    username: String,
    access_token: String,
    name: String,
    company: String,
    blog: String,
    bio: String,
    avatar_url: String,
    html_url: String,
    location: String,
    followers: Number,
    disk_usage: Number,
    hireable: Boolean
  },
  data: {
    rockStar: Number,
    activity: { week1: Number, week2: Number, week3: Number, week4: Number },
    longestStreak: String,
    repos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Repo'}],
    languages: {}
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
