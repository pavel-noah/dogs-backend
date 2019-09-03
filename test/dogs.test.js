require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Dog = require('../lib/models/Dog');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(async() => {
    JSON.parse(JSON.stringify(await Dog.create({
      name: 'Balloon',
      age: 6,
      weight: 34
    })));

    JSON.parse(JSON.stringify(await Dog.create({
      name: 'Twizzler',
      age: 3,
      weight: 17
    })));
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a new dog with POST route', () => {
    return request(app)
      .post('/api/v1/dogs')
      .send({
        name: 'Strelka',
        age: 6,
        weight: 58
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Strelka',
          age: 6,
          weight: 58,
          __v: 0
        });
      });
  });

  it('gets all the dogs with GET route', () => {
    return request(app)
      .get('/api/v1/dogs')
      .then(res => {
        expect(res.body).toEqual([{
          _id: expect.any(String),
          name: 'Balloon',
          age: 6,
          weight: 34,
          __v: 0
        }, {
          _id: expect.any(String),
          name: 'Twizzler',
          age: 3,
          weight: 17, 
          __v: 0
        }]);
      });
  });
});
