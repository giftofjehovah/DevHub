const request = require('request')
const port = process.env.PORT || 3000
// require('../app.js')

describe('User can register', function () {
  describe('GET /local/signup', function () {
    it('should return status 200', function (done) {
      request.get('http://localhost:' + port + '/local/signup').on('response', function (response) {
        expect(response.statusCode).toEqual(200)
        done()
        
      })
    })
  })
})
