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

  let dog1 = {};
  beforeEach(async() => {
    dog1 = JSON.parse(JSON.stringify(await Dog.create({
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

  it('gets a dog by name with GET/:name', () => {
    return request(app)
      .get('/api/v1/dogs/Balloon')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Balloon',
          age: 6,
          weight: 34,
          __v: 0
        });
      });
  });

  it('deletes a dog by id with DELETE/:id', () => {
    return request(app)
      .delete(`/api/v1/dogs/${dog1._id}`)
      .then(res => {
        console.log(dog1);
        console.log(res.body);
        expect(res.body._id).toEqual({
          _id: dog1._id,
          name: dog1.name,
          age: dog1.age,
          weight: dog1.weight,
          __v: 0
        });
      });
  });
});
