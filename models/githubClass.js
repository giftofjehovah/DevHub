'use strict'
const request = require('request')

class Github {
  constructor (access_token) {
    this.access_token = access_token
    this.repos = []
    this.rockStar = 0
  }

  getAllRepo (cb) {
    let options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'Authorization': 'token ' + this.access_token,
        'User-Agent': 'request'
      }
    }

    request.get(options, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        let repos = JSON.parse(body)
        cb(repos)
      } else {
        console.log('error')
      }
    })
  }

  getRockStar () {
    let rockStar = 0
    this.repos.forEach(function (repo) {
      rockStar += repo.stargazers_count
    })
    this.rockStar = rockStar
  }

}
module.exports = Github
