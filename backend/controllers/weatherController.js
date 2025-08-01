const fetchWeatherForecast = require("../services/weatherService");

const getWeather = async (req, res) => {
  const city = req.params.city;

  if (!city || typeof city !== "string" || city.trim() === "") {
    return res
      .status(400)
      .json({ error: "City is required and must be a non-empty string" });
  }

  try {
    const result = await fetchWeatherForecast(city);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather forecast." });
  }
};
module.exports = getWeather;
