const supertest = require('supertest');
const mongoose = require ('mongoose');
// const { describe, expect } = require(@jest/globals);
const app = require('../server/server')

const server = 'http://localhost:3000'

beforeAll(done => {
  done();
})
describe('It creates a job', () => {
  it('responds with a status 200 and creates adds a job to the database', () => {
    const body = {
      title: 'jest title',
      company: 'jest company',
      location: 'Silicon Valley',
      link: 'www.google.com/givemeajob',
      };
    return supertest(server)
      .post('/job/create')
      .send(body)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((res) => {
        expect(res.body.title).toEqual('jest title')
        expect(res.body._id).toBeDefined();
      })

  })
})

describe('It rejects creating a job missing a title', () => {
  it('responds with a status 404', () => {
    const body = {
      company: 'test company',
      location: 'Silicon Valley',
      link: 'www.google.com/givemeajob',
    };
    return supertest(server)
      .post('/job/create')
      .send(body)
      .expect(400)
  })
})

describe('It rejects creating a job missing a location', () => {
  it('responds with a status 404', () => {
    const body = {
      title: 'test title',
      company: 'test company',
      link: 'www.google.com/givemeajob',
    };
    return supertest(server)
      .post('/job/create')
      .send(body)
      .expect(400)
  })
})

describe('It rejects creating a job missing a link', () => {
  it('responds with a status 404', () => {
    const body = {
      title: 'test title',
      company: 'test company',
      location: 'location'
    };
    return supertest(server)
      .post('/job/create')
      .send(body)
      .expect(400)
  })
})


afterAll(done => {
  mongoose.connection.close();
  done();
})
