const request = require('request')

describe('User can register', function () {
  describe('GET /local/signup', function () {
    it('should return status 200', function (done) {
      request.get('http://localhost:3000/local/signup').on('response', function (response) {
        expect(response.statusCode).toEqual(200)
        done()
      })
    })
  })
})
