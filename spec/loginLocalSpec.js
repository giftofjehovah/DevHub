const request = require('request')
const port = process.env.PORT || 3000
const app = require('../app.js')
// const http = require('http')
// const api = require('../app.js')
// const apiRoot = 'api/'
// const server = http.createServer(api)
//
// before((done) => {
//   server.listen(() => {
//     console.log('server listening on port: ', server.address().port)
//     done()
//   })
// })

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
