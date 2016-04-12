'use strict'
const request = require('request')

class Github {
  constructor (access_token) {
    this.access_token = access_token
    this.repos = []
    this.rockStar = 0
    this.languages = {}
  }

  getAllRepo (cb) {
    let options = {
      url: 'https://api.github.com/user/repos',
      headers: {
        'Authorization': 'token ' + this.access_token,
        'User-Agent': 'request'
      }
    }

    request.get(options, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        let repos = JSON.parse(body)
        this.repos = repos
        cb(this.repos)
      } else {
        console.log('error')
      }
    })
  }

  getRockStar () {
    this.repos.forEach((repo) => {
      this.rockStar += repo.stargazers_count
    })
  }

  getLanguages (cb) {
    for (var i = 0; i < this.repos.length; i++) {
      if (this.repos[i].fork === false) {
        let options = {
          url: this.repos[i].languages_url,
          headers: {
            'Authorization': 'token ' + this.access_token,
            'User-Agent': 'request'
          }
        }

        request.get(options, (error, response, body) => {
          if (!error && response.statusCode === 200) {
            let languages = JSON.parse(body)
            this.setLanguage(languages)
          } else {
            console.log('error')
          }
          cb(this.languages)
        })
      }
    }
  }

  setLanguage (languages) {
    for (var k in languages) {
      if (this.languages.hasOwnProperty(k)) {
        this.languages[k] += languages[k]
      } else {
        this.languages[k] = languages[k]
      }
    }
  }
}
module.exports = Github
