require("dotenv").config({ path: ".env.test" });

const request = require("supertest");
const app = require("../index");
const connectDB = require("../db");
const mongoose = require("mongoose");

const berlinLocation = {
  name: "Berlin",
  latitude: 52.52437,
  longitude: 13.41053,
  country: "Deutschland",
  region: "Berlin",
};

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  // await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe("Widget API", () => {
  describe("POST /widget", () => {
    it("should create a new widget and return data with weather", async () => {
      const res = await request(app)
        .post("/widget")
        .send({ location: berlinLocation });

      expect(res.statusCode).toBe(201);
      expect(res.body.location).toMatchObject(berlinLocation);
      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("weather");
      expect(res.body.weather).toHaveProperty("temperature");
      expect(typeof res.body.weather.temperature).toBe("number");
    });

    it("should return 400 if location is missing", async () => {
      const res = await request(app).post("/widget").send({});
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if location is not an object", async () => {
      const res = await request(app)
        .post("/widget")
        .send({ location: "Berlin" });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if latitude is missing", async () => {
      const invalidLocation = { ...berlinLocation };
      delete invalidLocation.latitude;
      const res = await request(app)
        .post("/widget")
        .send({ location: invalidLocation });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });

    it("should return 400 if longitude is not a number", async () => {
      const invalidLocation = { ...berlinLocation, longitude: "not-a-number" };
      const res = await request(app)
        .post("/widget")
        .send({ location: invalidLocation });
      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty("error");
    });
  });

  describe("GET /widget", () => {
    it("should get all widgets with weather", async () => {
      const res = await request(app).get("/widget");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      if (res.body.length > 0) {
        expect(res.body[0]).toHaveProperty("location");
        expect(res.body[0]).toHaveProperty("weather");
      }
    });

    it("should return an empty array if no widgets exist", async () => {
      const res = await request(app).get("/widget");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("DELETE /widget/:id", () => {
    it("should delete a widget", async () => {
      const createRes = await request(app)
        .post("/widget")
        .send({ location: berlinLocation });
      const id = createRes.body.id;
      const deleteRes = await request(app).delete(`/widget/${id}`);
      expect(deleteRes.statusCode).toBe(204);
    });

    it("should return 204 even if widget does not exist", async () => {
      const fakeId = "64b7e1f2c2a4f2b1a1a1a1a1";
      const deleteRes = await request(app).delete(`/widget/${fakeId}`);
      expect(deleteRes.statusCode).toBe(204);
    });
  });
});
