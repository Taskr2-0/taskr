// require necessary SQL modules here


const userController = {};

// save new users to database
userController.signup = (req, res, next) => {
  console.log('entering signup middleware');
  try {
    // TO-DO db query here!
    res.locals.newUser = 'signup test'; // TO-DO: replace 'test' string with response from database
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