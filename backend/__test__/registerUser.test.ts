import { startWebScocketServer } from "../socket/webSocketServer";
import { connectDB } from "../database/connectDB";
import User from "../database/models/userModel";
import request from "supertest";
import { app } from "../app";
import bcrypt from "bcrypt";

User.create = jest.fn().mockReturnValueOnce({
  _id:"testID",
  name: "test",
  email: "test@gmail.com",
  password: 1234,
});

bcrypt.genSalt = jest.fn().mockReturnValueOnce(1);
bcrypt.hash = jest.fn().mockReturnValueOnce(1);
User.findOne = jest.fn().mockReturnValueOnce({
  name: "test",
  email: "test@gmail.com",
});
describe("test router /api/v1/users/register", () => {
  it("Should not register, because user already exits", async () => {
    User.findOne = jest.fn().mockReturnValueOnce({
      name: "test",
      email: "test@gmail.com",
    });
    const res = await request(app)
      .post("/api/v1/users/register")
      .set("Content-type", "application/json")
      .send({ name: "test", email: "test@gmail.com", password: "123" })
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  it("Should register a new user", async () => {
    User.findOne = jest.fn().mockReturnValueOnce(null);
    const res = await request(app)
      .post("/api/v1/users/register")
      .set("Content-type", "application/json")
      .send({ name: "test", email: "test@gmail.com", password: "123" })
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});
