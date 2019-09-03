const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

// to lowercase keys middleware not working yet
// app.use(require('./middleware/case-insensitive.js'));

app.use(express.json());

app.use('/api/v1/dogs', require('./routes/dogs'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
