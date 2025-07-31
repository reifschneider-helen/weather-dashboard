const express = require("express");
const cors = require("cors");
const fetchWeatherForecast = require("../services/weatherService");

const router = express.Router();

router.get("/:city", async (req, res) => {
  const city = req.params.city;
  const result = await fetchWeatherForecast(city);
  if (result) {
    res.json(result);
  } else {
    res.status(500).json({ error: "Failed to fetch weather forecast." });
  }
});

module.exports = router;
