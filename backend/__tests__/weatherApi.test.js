const request = require("supertest");
const app = require("../index");

describe("Weather API", () => {
  describe("GET /weather/:city", () => {
    it("should return weather data for a valid city", async () => {
      const res = await request(app).get("/weather/Berlin");

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("temperature");
      expect(res.body).toHaveProperty("humidity");
      expect(res.body).toHaveProperty("windSpeed");
      expect(res.body).toHaveProperty("rain");
      expect(res.body).toHaveProperty("snowfall");
    });

    it("should return 404 if city param is empty", async () => {
      const res = await request(app).get("/weather/ ");

      expect(res.statusCode).toBe(404);
    });

    it("should return 404 if city param is missing", async () => {
      const res = await request(app).get("/weather/");

      expect(res.statusCode).toBe(404);
    });

    it("should return 200 with error or null for a nonsense city", async () => {
      const res = await request(app).get("/weather/___notarealcity___");

      expect(res.statusCode).toBe(200);
      expect(
        res.body === null ||
          res.body.error !== undefined ||
          Object.values(res.body).every((v) => v === null)
      ).toBe(true);
    });
  });
});
