const db = require("../server/models/database");

const createTable = async () => {
  const createUserTable = `
    CREATE TABLE users (
        id int NOT NULL GENERATED ALWAYS AS IDENTITY,
        email varchar(255) NOT NULL UNIQUE,
        first_name varchar(255) NOT NULL,
        last_name varchar(255) NOT NULL,
        password varchar(255) NOT NULL,
        phone_number varchar(255),
        is_admin int NOT NULL,
        PRIMARY KEY (id)
    );
`;

  const createTicketTable = `
    CREATE TABLE tickets (
        id int NOT NULL GENERATED ALWAYS AS IDENTITY,
        title varchar(255) NOT NULL,
        description varchar(255) NOT NULL,
        status varchar(255) NOT NULL,
        priority int NOT NULL,
        user_id int NOT NULL,
        PRIMARY KEY (id),
        CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES users(id)
    );
`;
  db.query(createUserTable);

  db.query(createTicketTable);

  const testUserTableQuery = `
    INSERT INTO users (email, first_name, last_name, password, phone_number, is_admin)
    VALUES ('test@0909.com', 'Maria', '0909', 'testpassword', '000-000-0000', 0);
`;
  db.query(testUserTableQuery);

  const testTicketTableQuery = `
    INSERT INTO tickets (title, description, status, priority, user_id)
    VALUES ('test ticket', 'test ticket', 'pending', 3, 1);
`;

  db.query(testTicketTableQuery);

  const testJoin = `
  SELECT tickets.title, users.first_name FROM tickets JOIN users ON tickets.user_id = users.id;
`;

  db.query(testJoin);
};

const deleteTable = async() => {
  const dropUsers = `DROP TABLE users`;
  const dropTickets = `DROP TABLE tickets`;

  db.query(dropUsers);
  db.query(dropTickets);
};

module.exports = { createTable, deleteTable };
