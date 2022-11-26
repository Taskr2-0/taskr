const express = require('express');
const path = require('path');
const apiRouter = require('./routes/apiRouter.js');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded()); // urlencoded -> // built in middleware function that parses incoming requests with urlencoded payloads

// routes

// route requests to api
app.use('/api', apiRouter);


// 404 error handler:
app.use('*', (req, res, next) => {
  const err = {
    log: 'Request to unknown path',
    status: 404,
    message: { err: 'Not found' }
  }
  return next(err);
})

// global error handler:
app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught unknown middleware error.',
    status: 400,
    message: {err: 'An error ocurred'}
  };

  const errorObj = Object.assign(defaultError, err);
  console.log(errorObj.log);
  console.log(errorObj.status);

  res.send(JSON.stringify({status: errorObj.status, message: errorObj.message}));
})

app.listen(PORT, () => {
  console.log(`The CRAB is listening on port: ${PORT}. Watch out!!!!`);
})

module.exports = app;