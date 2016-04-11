// INDEX
const Company = require('../models/company')

function getAll (request, response) {
  Company.find((error, companies) => {
    if (error) return response.json({message: 'Company not found'})
    response.send('Companies displayed')
  })
}

// SHOW
function getCompany (request, response) {
  var id = request.params.id
  Company.findById({_id: id}, function (error, company) {
    if (error) response.json({message: 'Could not find company b/c:' + error})
    response.send('Company displayed')
  })
}

module.exports = {
  getAll: getAll,
  getCompany: getCompany

}
