const request = require("supertest");
const app = require("../app");

describe("Get Endpoint", () => {
  it("should get all raffles", async () => {
    const res = await request(app).get("/raffles");
    expect(res.statusCode).toEqual(200);
    expect(res.body[0]).toHaveProperty("name");
  });
});
