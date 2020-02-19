const request = require("supertest");
const app = require("../../src/app");

describe("Server General Test", () => {
  it("should server is running", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
