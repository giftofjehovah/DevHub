'use strict'
const Github = require('../models/githubClass')
const async = require('async')

function createProfile (req, res, next) {
  if (req.user && req.user.profiled === false) {
    let githubApi = new Github(req.user.github.access_token, req.user.github.username)
    githubApi.getAllRepo(function () {
      // githubApi.createHooks()
      async.parallel([
        githubApi.getRockStar.bind(githubApi),
        githubApi.getActivity.bind(githubApi),
        githubApi.getLongestStreak.bind(githubApi),
        githubApi.getLanguages.bind(githubApi),
        githubApi.getRepoSummary.bind(githubApi)
      ], save)
    })
  } else {
    next()
  }
  function save (err, result) {
    if (err) console.log(err)
    req.user.data.rockStar = result[0]
    req.user.data.activity = result[1]
    req.user.data.longestStreak = result[2]
    req.user.data.languages = result[3]
    req.user.data.repos = result[4]
    req.user.profiled = true
    req.user.save(function (err, user) {
      if (err) console.log(err)
      next()
    })
  }

}

module.exports = createProfile
