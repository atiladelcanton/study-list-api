const request = require("supertest");
const app = require("../../src/app");
const faker = require("faker");
describe("User Test", () => {
  it("should create a user", async () => {
    const data = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(10)
    };
    const response = await request(app)
      .post("/user")
      .send(data);

    expect(response.status).toBe(201);
  });

  it("should return user", async () => {
    const data = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(10)
    };
    const user = await request(app)
      .post("/user")
      .send(data);
    const email = user.body.user.email.toLowerCase();

    const response = await request(app)
      .get("/user/email")
      .send({ email: email });

    expect(response.status).toBe(200);
  });

  it("should must access a tokenized route for registration validation", async () => {
    const data = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(10)
    };
    const user = await request(app)
      .post("/user")
      .send(data);
    const email = user.body.user.email.toLowerCase();

    const returnUser = await request(app)
      .get("/user/email")
      .send({ email: email });

    const response = await request(app)
      .get("/user/validate-account")
      .send({
        token: returnUser.body.user.hash_validation_account,
        email: email
      });

    expect(response.status).toBe(200);
  });
});
