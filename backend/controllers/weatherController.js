const fetchWeatherForecast = require("../services/weatherService");

const getWeather = async (req, res) => {
  const city = req.params.city;

  try {
    const result = await fetchWeatherForecast(city);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch weather forecast." });
  }
};
module.exports = getWeather;
