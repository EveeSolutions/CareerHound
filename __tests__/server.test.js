const request = require('supertest')
const expect = require('chai')
const app = require('../server/server')

describe('/status/update endpoint functionality', () => {
  it('replies with an object when a POST request is sent', ()=>{
    request(app).post('/status/update')
      .expect('Content-Type', /application\/json/)
      .expect(200)
  })
})
