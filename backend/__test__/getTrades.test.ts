import request from "supertest";
import { app } from "../app";
import bcrypt from "bcrypt";
import User from "../database/models/userModel";

User.findOne = jest.fn().mockReturnValueOnce({
  name: "test",
  email: "test@gmail.com",
  password: 1234,
  wallet: {
    JPY: 500,
    USD: 500,
  },
  trades: ["tradeTest1", "tradeTest2"],
});
User.findById = jest.fn().mockReturnValue({
  name: "test",
  email: "test@gmail.com",
  password: 1234,
  trades: ["tradeTest1", "tradeTest2"],
  wallet: {
    JPY: 500,
    USD: 500,
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

jest.mock("jsonwebtoken", () => {
  const originalModule = jest.requireActual("jsonwebtoken"); // original functions

  return {
    ...originalModule,
    verify: jest.fn().mockReturnValue({ id: "testID" }), // overwrite verify})
  };
});

// Get authorized token
beforeAll = () => {
  request(app)
    .post("/api/v1/users/login")
    .set("Content-type", "application/json")
    .send({ email: "test@gmail.com", password: "123" })
    .end((err, response) => {
      token = response.body.result.token; // save the token!
      console.log(token);
    });
};

describe("test router GET /api/v1/trades", () => {
  it("Should give back not authorized", async () => {
    const res = await request(app)
      .get("/api/v1/trades")
      .then((res) => {
        expect(res.statusCode).toBe(401);
      });
  });
  it("Should get all trades back /api/v1/trades", async () => {
    const res = await request(app)
      .get("/api/v1/trades")
      .set({ Authorization: `Bearer ${token}` })
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.result.trades[0]).toBe("tradeTest1");
        expect(res.body.result.trades[1]).toBe("tradeTest2");
      });
  });
});
