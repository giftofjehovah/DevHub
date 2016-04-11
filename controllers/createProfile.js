'use strict'
const Github = require('../models/githubClass')

// let githubApi = new Github()
function createProfile (req, res, next) {
  if (req.user) {
    let githubApi = new Github(req.user.github.access_token)
    console.log(githubApi)
    githubApi.getAllRepo(function (repos) {
      githubApi.repos = repos
      githubApi.getRockStar()
      console.log(githubApi.rockStar)
    })


  }
next()
}

module.exports = createProfile
