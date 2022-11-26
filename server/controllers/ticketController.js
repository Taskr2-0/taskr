// require necessary SQL modules here


const ticketController = {}

ticketController.getUserTickets = (req, res, next) => {
  console.log('entering getuserTickets middleware');
  try {
    // TO-DO db query here!
    res.locals.userTickets = 'getUserTickets test'; // TO-DO: replace 'test' string with db response
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

ticketController.getAdminTickets = (req, res, next) => {
  console.log('entering getuserTickets middleware');
  try {
    // TO-DO db query here!
    res.locals.adminTickets = 'getAdminTickets test'; // TO-DO: replace 'test' string with db response
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

ticketController.createTicket = (req, res, next) => {
  console.log('entering createTicket middleware');
  try {
    // TO-DO db query here!
    res.locals.newTicket = 'newTicket test'; // TO-DO: replace 'test' string with db response
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

ticketController.deleteTicket = (req, res, next) => {
  console.log('entering deleteTicket middleware');
  try {
    // TO-DO db query here!
    res.locals.deletedTicket = 'deletedTicket test'; // TO-DO: replace 'test' string with db response
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

ticketController.updateTicket = (req, res, next) => {
  console.log('entering updateTicket middleware');
  try {
    // TO-DO db query here!
    res.locals.updatedTicket = 'updatedTicket test'; // TO-DO: replace test string with db response
    return next();
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