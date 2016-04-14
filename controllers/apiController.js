const User = require('../models/user')
const Company = require('../models/company')

function getUser (req, res) {
  const username = req.params.username

  User.find({'github.username': username}, function (err, user) {
    if (err) console.log(err)
    if (user.length === 0) res.status(200).json({message: 'no user found'})
    else res.status(200).json(user)
  })
}

function getCompany (req, res) {
  const name = req.params.name

  Company.find({'name': name}, function (err, company) {
    if (err) console.log(err)
    if (company.length === 0) res.status(200).json({message: 'no company found'})
    else res.status(200).json(company)
  })
}

function getUsers (req, res) {
  User.find(function (err, users) {
    if (err) console.log(err)
    if (users.length === 0) res.status(200).json({message: 'no users found'})
    else res.status(200).json(users)
  })
}

function getCompanies (req, res) {
  Company.find(function (err, companies) {
    if (err) console.log(err)
    if (companies.length === 0) res.status(200).json({message: 'no companies found'})
    else res.status(200).json(companies)
  })
}

module.exports = {
  getUser: getUser,
  getCompany: getCompany,
  getUsers: getUsers,
  getCompanies: getCompanies
}
