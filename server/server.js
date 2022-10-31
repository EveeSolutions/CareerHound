const express = require('express');
const app = express();

require('dotenv').config;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: job_info
})
.then(() => {console.log('connected to Mongo DB')})
.catch((err) => {console.log(`Error: ${err}`)});

// require routers here

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// add routes here

app.get('/', (req, res) => {
    res.sendStatus(200);
  });
  
  app.use('*', (req, res) => {
    res.status(404).send('Uh oh, no jobs here');
  });

  app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });
  
  const PORT = 3000;
  module.exports = app.listen(PORT, function () {
    console.log('App listening on port: ' + PORT);
  });