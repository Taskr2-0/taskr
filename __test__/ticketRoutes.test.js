const request = require("supertest");
const { server } = require("../server/server.js");
const mockDb = require("./mock_db");

const endpoint = "http://localhost:3000";

describe("TicketRoutes Tests", () => {
  afterAll(async () => {
    try {
      await server.close();
    } catch (error) {
      console.log(error);
    }
  });

  it("should get all tickets for valid user", () =>
    request(endpoint)
      .get("/api/usertickets")
      .set({ id: 1 })
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .expect((res) => {
        return expect(res.text).toContain(
          "title",
          "priority",
          "status",
          "user_id"
        );
      }));

  it("should not get all tickets for invalid user", () =>
    request(endpoint)
      .get("/api/usertickets")
      .set({ id: 0 })
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .expect((res) =>
        expect(res.text).not.toContain("title", "priority", "status", "user_id")
      ));

  let ticket = {
    title: "test",
    description: "test",
    status: "In Progress",
    priority: 1,
    user_id: 1,
  };

  it("should create ticket for valid request", () =>
    request(endpoint)
      .post("/api/usertickets")
      .set({ id: 1 })
      .send(ticket)
      .expect(200)
      .expect(async (res) => {
        deleteTicketId = await res.body.id;
        return expect(res.text).toContain(
          "title",
          "priority",
          "status",
          "user_id"
        );
      }));

  it("should not create ticket for valid request", () =>
    request(endpoint)
      .post("/api/usertickets")
      .set({ id: 1 })
      .send({ test: "title" })
      .expect(200)
      .expect((res) => {
        return expect(res.text).toContain("Unable to create ticket");
      }));

  it("should delete ticket for valid request", () =>
    request(endpoint)
      .post("/api/usertickets")
      .set({ id: 1 })
      .send(ticket)
      .expect(200)
      .expect((res) => {
        const ticketId = res.body.id;
        return request(endpoint)
          .delete("/api/usertickets")
          .send({ ticketId })
          .expect(200)
          .expect((res) =>
            expect(res.text).toContain("title", "priority", "status", "user_id")
          );
      }));

  it("should get all admin tickets", () =>
    request(endpoint)
      .get("/api/admintickets")
      .expect(200)
      .expect((res) =>
        expect(res.text).toContain("title", "priority", "status", "user_id")
      ));

  it("should update existing ticket", () =>
    request(endpoint)
      .patch("/api/admintickets")
      .send({ ticketId: 5, newStatus: "Completed" })
      .expect((res) =>
        expect(res.text).toContain("title", "priority", "status", "user_id")
      ));
});
