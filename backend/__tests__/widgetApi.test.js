require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const app = require("../index");
const connectDB = require("../db");
const mongoose = require("mongoose");

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  //   await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Widget API", () => {
  describe("POST /widget", () => {
    it("should create a new widget and return data with weather", async () => {
      const res = await request(app)
        .post("/widget")
        .send({ location: "Berlin" });

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty(
        "location",
        "Berlin",
        "createdAt",
        "weather"
      );
      expect(res.body.weather).toHaveProperty("temperature");
      expect(typeof res.body.weather.temperature).toBe("number");
    });

    it("should return 400 if location is missing", async () => {
      const res = await request(app).post("/widget").send({});

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if location is not a string", async () => {
      const res = await request(app).post("/widget").send({ location: 12345 });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /widget", () => {
    it("should get all widgets with weather", async () => {
      const res = await request(app).get("/widget");

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("DELETE /widget/:id", () => {
    it("should delete a widget", async () => {
      const createRes = await request(app)
        .post("/widget")
        .send({ location: "Teststadt" });
      const id = createRes.body.id;
      const deleteRes = await request(app).delete(`/widget/${id}`);

      expect(deleteRes.statusCode).toBe(204);
    });
  });
});
