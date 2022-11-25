const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded()); // urlencoded -> // built in middleware function that parses incoming requests with urlencoded payloads

// routes

app.listen(PORT, () => {
  console.log(`The CRAB is listening on port: ${PORT}. Watch out!!!!`);
})

module.exports = app;