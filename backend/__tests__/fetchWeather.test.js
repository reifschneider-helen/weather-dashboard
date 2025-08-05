const fetchWeatherForecast = require("../services/weatherService");

describe("fetchWeatherForecast", () => {
  it("should return weather data for valid coordinates", async () => {
    const result = await fetchWeatherForecast({
      name: "Berlin",
      latitude: 52.52437,
      longitude: 13.41053,
    });
    expect(result).toHaveProperty("location", "Berlin");
    expect(result).toHaveProperty("temperature");
    expect(typeof result.temperature).toBe("number");
    expect(result).toHaveProperty("humidity");
    expect(result).toHaveProperty("windSpeed");
    expect(result).toHaveProperty("rain");
    expect(result).toHaveProperty("snowfall");
  });

  it("should return null for invalid coordinates", async () => {
    const result = await fetchWeatherForecast({
      name: "Invalid",
      latitude: 999,
      longitude: 999,
    });
    expect(result).toBeNull();
  });

  it("should return null if missing parameters", async () => {
    const result = await fetchWeatherForecast({});
    expect(result).toBeNull();
  });
});
