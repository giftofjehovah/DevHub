'use strict'
const request = require('request')
const express = require('express')
const fs = require('fs')
const cheerio = require('cheerio')
const app = express()

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
        $('.contrib-number').eq(1).filter(function () {
          const longestStreak = $(this)
          this.longestStreak = longestStreak.text()
        })
      }
    })
  }

}
module.exports = Github
