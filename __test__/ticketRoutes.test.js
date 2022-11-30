const request = require('supertest');
const mockDb = require('./mock_db');

const server = 'http://localhost:3000';

describe('TicketRoutes Tests', () => {

  it('should get all tickets for valid user', () => request(server)
    .get('/api/usertickets')
    .set({ id: 1 })
    .expect('Content-Type', /application\/json/)
    .expect(200)
    .expect(res => {
      return expect(res.text).toContain('title', 'priority', 'status', 'user_id')
    })
  );

  it('should not get all tickets for invalid user', () => request(server)
    .get('/api/usertickets')
    .set({ id: 0 })
    .expect('Content-Type', /application\/json/)
    .expect(200)
    .expect(res => expect(res.text).not.toContain('title', 'priority', 'status', 'user_id'))
  );

  let ticket = {
    title: "test", description: "test", status: "In Progress", priority: 1, user_id: 1
  }

  let deleteTicketId;

  it('should create ticket for valid request', () => request(server)
    .post('/api/usertickets')
    .set({ id: 1 })
    .send(ticket)
    .expect(200)
    .expect(async res => {
      deleteTicketId = await res.body.id
      return expect(res.text).toContain('title', 'priority', 'status', 'user_id')
    })
  );


  it('should not create ticket for valid request', () => request(server)
    .post('/api/usertickets')
    .set({ id: 1 })
    .send({ test: "title" })
    .expect(200)
    .expect(res => {
      return expect(res.text).toContain("Unable to create ticket")
    })
  );

  it('should delete and return ticket', () => request(server)
    .delete('/api/usertickets')
    .send({ ticketId: deleteTicketId })
    .expect(200)
  );

})