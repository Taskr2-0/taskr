const db = require('./database.js');

// const createUserTable = `
//     CREATE TABLE users (
//         id int NOT NULL GENERATED ALWAYS AS IDENTITY,
//         email varchar(255) NOT NULL UNIQUE,
//         first_name varchar(255) NOT NULL,
//         last_name varchar(255) NOT NULL,
//         password varchar(255) NOT NULL,
//         phone_number varchar(255),
//         is_admin int NOT NULL,
//         PRIMARY KEY (id)
//     );
// `

// const createTicketTable = `
//     CREATE TABLE tickets (
//         id int NOT NULL GENERATED ALWAYS AS IDENTITY,
//         title varchar(255) NOT NULL,
//         description varchar(255) NOT NULL,
//         status varchar(255) NOT NULL,
//         priority int NOT NULL,
//         user_id int NOT NULL,
//         PRIMARY KEY (id),
//         CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
//     );
// `
// db.query(createUserTable)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// db.query(createTicketTable)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// const testUserTableQuery = `
//     INSERT INTO users (email, first_name, last_name, password, phone_number, is_admin)
//     VALUES ('test@0909.com', 'Maria', '0909', 'testpassword', '000-000-0000', 0);
// `
// db.query(testUserTableQuery)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// const testTicketTableQuery = `
//     INSERT INTO tickets (title, description, status, priority, user_id)
//     VALUES ('test ticket', 'test ticket', 'pending', 3, 1);
// `

// db.query(testTicketTableQuery)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// const testJoin = `
//   SELECT tickets.title, users.first_name FROM tickets JOIN users ON tickets.user_id = users.id;
// `

// db.query(testJoin)
//   .then(data => console.log(data))
//   .catch(err => console.log(err));
