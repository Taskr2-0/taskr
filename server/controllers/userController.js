const db = require("../models/database.js");

const userController = {};

// save new users to database
userController.signup = async (req, res, next) => {
  console.log('THIS IS THE REQ.BODY: ', req.body)
  if (req.body.isAdmin == 1 && req.body.adminCode != 123) {
    const error = {
      log: "unauthorized admin ",
      status: 400,
      message: { err: "Unable to log in as admin, incorrect code" },
    };
    return next(error)
  }
  
  const requiredFields = [req.body.email, req.body.firstName, req.body.lastName, req.body.password, req.body.phoneNum, req.body.isAdmin]
  console.log(requiredFields)
  if (Object.values(requiredFields).some(val => !val || val === '')) {
    const error = {
      log: "Error at userController.signup middleware: ",
      status: 400,
      message: { err: "Please fill out all fields to sign up" },
    };
    return next(error);
  }

  
  const { email, firstName, lastName, password, phoneNum, isAdmin } = req.body;
  
  try {
    const queryText = `INSERT INTO users (email, first_name, last_name, password, phone_number, is_admin)
                        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`;

    const values = [email, firstName, lastName, password, phoneNum, isAdmin];

    if (values.some((val) => !val || val === "")) {
      const error = {
        log: "Error at userController.signup middleware: " + err,
        status: 400,
        message: { err: "Please fill out all fields to sign up" },
      };
      return next(error);
    }

    const createResponse = await db.query(queryText, values);
    console.log('THIS IS THE CREQTERESPONSE QUERY: ', createResponse)
    req.session.user = createResponse.rows[0];
    req.session.authorized = true;
    res.locals.newUser = createResponse.rows[0];
    return next();
  } catch (err) {
    const error = {
      log: "Error at userController.signup middleware: " + err,
      status: 400,
      message: { err: "Unable to create user" },
    };
    return next(error);
  }
};

// log user in
userController.login = async (req, res, next) => {
  console.log("entering login middleware");
  try {
    const queryText = "SELECT * FROM users WHERE email=$1 AND password=$2;";
    const values = [req.body.email, req.body.password];
    const queryResult = await db.query(queryText, values);
    req.session.user = queryResult.rows[0];
    req.session.authorized = true;
    res.locals.loggedIn = queryResult.rows[0];
    if (res.locals.loggedIn === undefined) {
      res.locals.loggedIn = { err: "User could not be verified" };
    }
    return next();
  } catch (err) {
    const error = {
      log: "Error at userController.login middleware: " + err,
      status: 400,
      message: { err: "Unable to log in" },
    };
    return next(error);
  }
};

userController.authenticateUser = (req, res, next) => {
  if (req.session.user) {
    res.locals.user = req.session.user;
    return next();
  } else {
    const error = {
      log: "Error at userController.authenticateUser middleware: Unauthorized",
      status: 400,
      message: { err: "Unauthorized" },
    };
    return next(error);
  }
};

module.exports = userController;
