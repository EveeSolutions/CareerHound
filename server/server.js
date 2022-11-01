const express = require('express');
const path = require('path');
const app = express();

const jobRouter = require('./routers/jobRouter');
const statusRouter = require('./routers/statusRouter');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// not sure if we need
app.use(express.static(path.resolve('./client/assets')));

app.use('/job', jobRouter);
app.use('/status', statusRouter);

app.get('*', (req, res) => {
  res.status(200).sendFile(path.resolve('./client/index.html'));
});
  
  app.use('*', (req, res) => {
    res.status(404).send('Uh oh, no jobs here');
  });

  app.get('/', (err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    if (errorObj.log) console.log(errorObj);
    return res.status(errorObj.status).json(errorObj.message);
  });
  
  const PORT = 3000;
  module.exports = app.listen(PORT, function () {
    console.log('App listening on port: ' + PORT);
  });

  module.exports = app;