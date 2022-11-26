const express = require('express');

// require controllers
const userController = require('../controllers/userController.js');
const ticketController = require('../controllers/ticketController.js');

const app = require('../server.js');


const router = express.Router();

// route requests to create new user
router.post('/signup', userController.signup, (req, res) => {
  console.log('exited signup middleware, preparing signup response');
  return res.status(200).json(res.locals.newUser) // expecting userController.signup to save db response as locals property newUser
})

// route requests to login
router.post('/login', userController.login, (req, res) => {
  console.log ('exited login middleware, preparing login response');
  return res.status(200).json(res.locals.loggedIn) // expecting userController.login to save db response as locals property loggedIn
})

// route requests to get user tickets

// route requests to get admin tickets

// route requests for user to create a new ticket

// route requests for user to delete ticket

// route requests for admin to update ticket status

module.exports = router;