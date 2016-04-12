'use strict'
const request = require('request')
const cheerio = require('cheerio')

class Github {
  constructor (access_token) {
    this.access_token = access_token
    this.repos = []
    this.rockStar = 0
    this.languages = {}
    this.repoSummary = []
    this.longestStreak = ''
    this.activity = {}
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
    const repos = this.repos.filter(function (repo) {
      return repo.fork === false
    })
    let counter = 0
    for (let i = 0; i < repos.length; i++) {
      let options = {
        url: repos[i].languages_url,
        headers: {
          'Authorization': 'token ' + this.access_token,
          'User-Agent': 'request'
        }
      }

      request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let languages = JSON.parse(body)
          this.setLanguage(languages)
          counter++
        } else {
          console.log('error')
        }
        if (counter === repos.length) {
          cb(this.languages)
        }
      })
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

  languagesPercentage () {
    let sum = 0
    let calLanguaged = {}
    for (var k in this.languages) {
      sum += this.languages[k]
    }
    for (var key in this.languages) {
      let percentage = (this.languages[key] / sum) * 100
      let roundOff = Math.round(percentage * 10) / 10
      calLanguaged[key] = roundOff
    }
    return calLanguaged
  }
  getLongestStreak (req, res) {
    var url = 'https://github.com/' + this.username
    request(url, function (error, response, html) {
      if (!error) {
        const $ = cheerio.load(html)
        $('.contrib-number').eq(1).filter(() => {
          const data = $(this)
          this.longestStreak = data.text()
        })
      }
    })
  }

  // Get one repo's languages
  getRepoLanguages (cb) {
    this.repos.forEach((repo) => {
      let options = {
        url: 'https://api.github.com/repos/' + repo.full_name + '/languages',
        headers: {
          'Authorization': 'token ' + this.access_token,
          'User-Agent': 'request'
        }
      }

      request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          let repoLanguages = JSON.parse(body)
          // console.log(repoLanguages)
          let repoSummary = {
            name: repo.name,
            desc: repo.description,
            languages: repoLanguages
          }
          console.log(repoSummary)
          this.repoSummary.push(repoSummary)
          cb(repoSummary)
        } else {
          console.log('error')
        }
      })
    })
  }

  getActivity () {
    // for (var i = 48; i < 52; i++) {
    let week1 = 0
    let week2 = 0
    let week3 = 0
    let week4 = 0
    let counter = 0
    this.repos.forEach((repo) => {
      let participation = {
        url: 'https://api.github.com/repos/' + repo.full_name + '/stats/participation',
        headers: {
          'Authorization': 'token ' + this.access_token,
          'User-Agent': 'request'
        }
      }
      request.get(participation, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          counter++
          var activity = JSON.parse(body)
          if (!(activity.owner[48] === undefined)) {
            week1 += activity.owner[48]
            week2 += activity.owner[49]
            week3 += activity.owner[50]
            week4 += activity.owner[51]
          }
          if (counter === this.repos.length) {
            let activity = {
              week1: week1,
              week2: week2,
              week3: week3,
              week4: week4
            }
            this.activity = activity
            console.log(this.activity)
          }
        } else {
          console.log(error)
        }
      })
    })
  }

}
module.exports = Github
