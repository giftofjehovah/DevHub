'use strict'
const request = require('request')

describe('User can register', function () {
  describe('GET /local/signup', function () {
    it('should return status 200', function () {
      request.get('http://localhost:5000/local/signup').on('response', function (response) {
        expect(response.statusCode).toEqual(200)
      })
    })
  })
})
