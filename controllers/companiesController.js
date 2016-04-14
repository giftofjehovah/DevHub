// INDEX
const Company = require('../models/company')

function getAll (req, res) {
  Company.find(function (error, companies) {
    if (error) return res.json({message: 'Company not found'})
    // response.send('Companies displayed')
    res.render('companies', {companies: companies})
  })
}

// SHOW
function getCompany (req, res) {
  var id = req.params.id
  Company.findById({_id: id}, function (error, company) {
    if (error) res.json({message: 'Could not find company b/c:' + error})
    // response.send('Company displayed')
    res.json({company: company})
  })
}

module.exports = {
  getAll: getAll,
  getCompany: getCompany

}
