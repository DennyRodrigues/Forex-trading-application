import request from "supertest";
import { app } from "../app";
import bcrypt from "bcrypt";
import User from "../database/models/userModel";

User.findOne = jest.fn().mockReturnValueOnce({
  name: "test",
  email: "test@gmail.com",
  password: 1234,
  wallet: {
    JPY: 5000,
    USD: 5000,
  },
  trades: ["tradeTest1", "tradeTest2"],
});
User.findById = jest.fn().mockReturnValue({
  name: "test",
  email: "test@gmail.com",
  password: 1234,
  trades: ["tradeTest1", "tradeTest2"],
  wallet: {
    JPY: 5000,
    USD: 5000,
  },
  select: () => {
    return {
      user: {
        _id: "testID",
      },
    };
  },
  save: () => {},
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
    });
};

describe("test router POST /api/v1/trades", () => {
  it("Should give back not authorized", async () => {
    const res = await request(app)
      .post("/api/v1/trades")
      .then((res) => {
        expect(res.statusCode).toBe(401);
      });
  });
  it("Should give back invalid request", async () => {
    const res = await request(app)
      .post("/api/v1/trades")
      .set({ Authorization: `Bearer ${token}` })
      .set("Content-type", "application/json")
      .send(
        JSON.stringify({
          entrySymbol: "JPY",
          exitSymbol: "USD",
          exchangeRate: "1.5",
          value: "100",
        })
      )
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  it("Should give back invalid request, because of missing request field", async () => {
    const res = await request(app)
      .post("/api/v1/trades")
      .set({ Authorization: `Bearer ${token}` })
      .set("Content-type", "application/json")
      .send(
        JSON.stringify({
          entrySymbol: "JPY",
          exitSymbol: "USD",
          exchangeRate: "1.5",
          value: "100",
        })
      )
      .then((res) => {
        expect(res.statusCode).toBe(400);
      });
  });
  it("Should give back invalid request, because of entry amount is bigger than wallet amount", async () => {
    const res = await request(app)
      .post("/api/v1/trades")
      .set({ Authorization: `Bearer ${token}` })
      .set("Content-type", "application/json")
      .send(
        JSON.stringify({
          date: new Date(),
          entrySymbol: "JPY",
          exitSymbol: "USD",
          exchangeRate: "1.5",
          value: "10000",
        })
      )
      .then((res) => {
        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe(
          "not enough money on wallet to make transaction"
        );
      });
  });
  it("Should post a new trade JPY to USD", async () => {
    const res = await request(app)
      .post("/api/v1/trades")
      .set({ Authorization: `Bearer ${token}` })
      .set("Content-type", "application/json")
      .send(
        JSON.stringify({
          date: new Date(),
          entrySymbol: "JPY",
          exitSymbol: "USD",
          exchangeRate: 1.5,
          value: 100,
        })
      )
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
  it("Should post a new trade USD to JPY", async () => {
    const res = await request(app)
      .post("/api/v1/trades")
      .set({ Authorization: `Bearer ${token}` })
      .set("Content-type", "application/json")
      .send(
        JSON.stringify({
          date: new Date(),
          entrySymbol: "JPY",
          exitSymbol: "USD",
          exchangeRate: "1.5",
          value: "100",
        })
      )
      .then((res) => {
        expect(res.statusCode).toBe(201);
      });
  });
});
