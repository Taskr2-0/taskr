// require necessary SQL modules here
const db = require('../models/database.js');

const userController = {};

// save new users to database
userController.signup = async (req, res, next) => {
  console.log('entering signup middleware');
  try {
    const queryText = `INSERT INTO users (email, first_name, last_name, password, phone_number, is_admin)
                        VALUES ($1, $2, $3, $4, $5, $6)`;
    const values = [req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.phoneNum, req.body.isAdmin];
    const newUser = await db.query(queryText, values);
    console.log('newUser: ', newUser);
    res.locals.newUser = newUser.rows[0]; // TO-DO: replace 'test' string with response from database
    console.log('created user: ', res.locals.newUser)
    return next();
  } catch(err) {
    const error = {
      log: 'Error at userController.signup middleware: ' + err,
      status: 400,
      message: {err: 'Unable to create user'}
    }
    return next(error);
  }
}

// log user in
userController.login = (req, res, next) => {
  console.log('entering login middleware');
  try {
    // TO-DO db query here!
    res.locals.loggedIn = 'login test'; // TO-DO: replace 'test' string with response from database
    console.log('logged in: ', res.locals.loggedIn)
    return next();
  } catch(err) {
    const error = {
      log: 'Error at userController.login middleware: ' + err,
      status: 400,
      message: {err: 'Unable to log in'}
    }
    return next(error);
  }
}

module.exports = userController;