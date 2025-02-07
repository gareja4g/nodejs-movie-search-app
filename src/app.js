const express = require('express');
const app = express();
const movieRoutes = require('./routes/movieRoutes');


app.use(express.json());
app.use('/api/v1', movieRoutes);

module.exports = app;
