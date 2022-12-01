const db = require('../models/database.js');

// requiring Twilio API
// const twilioAuth = require('../../twilioAuth.js');
// const accountSid = twilioAuth.TWILIO_ACCOUNT_SID;
// const authToken = twilioAuth.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);


const ticketController = {}

ticketController.getUserTickets = async (req, res, next) => {
  console.log('entering getuserTickets middleware');
  if(!req.session.user){
    const error = {
      log: 'Error at ticketController.getUserTickets middleware: Unauthorized',
      status: 400,
      message: {err: 'Unauthorized'}
    }
    return next(error);
  }

  try {
    // TO-DO db query here!
    const queryText = `SELECT * FROM tickets WHERE user_id=$1;`;
    const values = [req.session.user.id]
    const userTickets = await db.query(queryText, values);
    res.locals.userTickets = userTickets.rows; // TO-DO: replace 'test' string with db response
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.getUserTickets middleware: ' + err,
      status: 400,
      message: {err: 'Unable to get user tickets'}
    }
    return next(error);
  }
}

ticketController.getAdminTickets = async (req, res, next) => {
  console.log('entering getuserTickets middleware');
  try {
    const queryText = `SELECT tickets.*, users.first_name, users.last_name FROM 
                      tickets LEFT OUTER JOIN users
                      ON users.id = tickets.user_id;`;
    const allTickets = await db.query(queryText);
    res.locals.adminTickets = allTickets.rows; // TO-DO: replace 'test' string with db response
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.getAdminTickets middleware: ' + err,
      status: 400,
      message: {err: 'Unable to get admin tickets'}
    }
    return next(error);
  }
}

ticketController.createTicket = async (req, res, next) => {
  console.log('entering createTicket middleware');
  try {
    // TO-DO db query here!
    const queryText = `INSERT INTO tickets (title, description, status, priority, user_id)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const values = [req.body.title, req.body.description, req.body.status, req.body.priority, req.body.user_id];
    const newTicket = await db.query(queryText, values);
    res.locals.newTicket = newTicket.rows[0];
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.newTicket middleware: ' + err,
      status: 400,
      message: {err: 'Unable to create ticket.'}
    }
    return next(error);
  }
}

ticketController.deleteTicket = async (req, res, next) => {
  console.log('entering deleteTicket middleware');
  try {
    // TO-DO db query here!
    const queryTextDelete = `
    SELECT * FROM tickets WHERE id=$1;
    `
    const queryText = `
    DELETE FROM tickets WHERE id=$1;
    `
    const values = [req.body.ticketId];
    const deletedTicket = await db.query(queryTextDelete, values);
    const deleteResponse = await db.query(queryText, values);
    res.locals.deletedTicket = deletedTicket.rows; // TO-DO: replace 'test' string with db response
    return next();
  } catch(err) {
    const error = {
      log: 'Error at ticketController.deletedTicket middleware: ' + err,
      status: 400,
      message: {err: 'Unable to delete ticket.'}
    }
    return next(error);
  }
}

ticketController.updateTicket = async (req, res, next) => {
  console.log('entering updateTicket middleware');
  try {
    // TO-DO db query here!
    const queryText = `
    UPDATE tickets
    SET status=$1
    WHERE id=$2;
    `;
    const values = [req.body.newStatus, req.body.ticketId];
    const updateResponse = await db.query(queryText, values);
    const queryTextUpdated = `
    SELECT * FROM tickets WHERE id=$1;
    `
    const updatedTicket = await db.query(queryTextUpdated, [req.body.ticketId]);
    // console.log('body of selected ticket: ', updatedTicket.rows[0]);
    res.locals.updatedTicket = updatedTicket.rows[0];
    res.locals.ticketTitle = res.locals.updatedTicket.title;
    res.locals.ticketStatus = req.body.newStatus;

    // get user phone number: 
    // const numberQueryText = `SELECT phone_number FROM users WHERE id=$1`
    // const userNumber = await db.query(numberQueryText, [res.locals.updatedTicket.user_id]);
    // console.log('number: ', userNumber);
    // if (userNumber.rows[0].phone_number.length === 10) {
    //   console.log('calling Twilio to ', userNumber.rows[0].phone_number)
    //   client.messages
    //     .create({
    //       body: `From Taskr: Your task '${res.locals.ticketTitle}' has been updated to ${res.locals.ticketStatus}`,
    //       from: '+15618164263',
    //       to: `+1${userNumber.rows[0].phone_number}`
    //     })
    //     .then(message => {
    //       console.log(message.sid)
    //       return next();
    //     });
        
    // } else {
      return next();

    // }    // send Twilio alert

  } catch(err) {
    const error = {
      log: 'Error at ticketController.updateTicket middleware: ' + err,
      status: 400,
      message: {err: 'Unable to update ticket.'}
    }
    return next(error);
  }
}



module.exports =  ticketController;