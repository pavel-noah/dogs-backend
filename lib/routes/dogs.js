const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
  .get('/', (req, res, next) => {
    Dog
      .find()
      .then(dogs => res.send(dogs))
      .catch(next);
  });
