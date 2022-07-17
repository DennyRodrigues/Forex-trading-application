import jwt from "jsonwebtoken";
import request from "supertest";
import { app } from "../app";
import User from "../database/models/userModel";

User.findOne = jest.fn().mockReturnValueOnce({
  name: "test",
  email: "test@gmail.com",
  password: 1234,
  wallet: {
    USD: 500,
    BTC: 500,
  },
});
User.findById = jest.fn().mockReturnValue({
  name: "test",
  email: "test@gmail.com",
  password: 1234,
  wallet: {
    USD: 500,
    BTC: 500,
  },
  select: () => {
    return {
      user: {
        _id: "testID",
      },
    };
  },
});

jest.mock("jsonwebtoken", () => {
  const originalModule = jest.requireActual("jsonwebtoken"); // original functions

  return {
    ...originalModule,
    verify: jest.fn().mockReturnValue({ id: "testID" }), // overwrite verify})
  };
});

let token;
beforeAll = () => {
  request(app)
    .post("/api/v1/users/login")
    .set("Content-type", "application/json")
    .send({ email: "Tilapia@gmail.com", password: "123" })
    .end((err, response) => {
      token = response.body.result.token; // save the token!
    });
};

describe("test GET router /api/v1/users/me", () => {
  it("Should get user Info", async () => {
    const res = await request(app)
      .get("/api/v1/users/me")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBe("success");
        expect(res.body.result.name).toBe("test");
        expect(res.body.result.email).toBe("test@gmail.com");
        expect(res.body.result.wallet.USD).toBe(500);
        expect(res.body.result.wallet.BTC).toBe(500);
      });
  });
  it("Should receive not authorized", async () => {
    const res = await request(app)
      .get("/api/v1/users/me")
      .then((res) => {
        expect(res.statusCode).toBe(401);
      });
  });
});
