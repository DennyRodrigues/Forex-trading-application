import encodings from "../../node_modules/iconv-lite/encodings";
import request from "supertest";
import { app } from "../app";
import { connectDB } from "../database/connectDB";
import MongoClient from "mongodb";
import User from "../database/models/userModel";
import bcrypt from "bcrypt";

User.findOne = jest.fn().mockReturnValueOnce({
  name: "test",
  email: "test@gmail.com",
  password: 1234,
  wallet: {
    JPY: 500,
    USD: 500,
  },
});

bcrypt.compare = jest.fn().mockReturnValueOnce(true);

describe("test router /api/v1/users/login", () => {
  it("Should register User", async () => {
    const res = await request(app)
      .post("/api/v1/users/login")
      .set("Content-type", "application/json")
      .send({ email: "test@gmail.com", password: "1234" })
      .then((res) => {
        expect(res.body.result.name).toBe("test");
        expect(res.statusCode).toBe(200);
      });
  });
});
