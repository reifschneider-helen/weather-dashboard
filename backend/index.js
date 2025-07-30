const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Weather Dashboard API");
});

async function fetchWeatherData() {
  try {
    const geoRes = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=de&format=json"
    );
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("No geocoding results found.");
    }
    const firstResult = geoData.results[0];
    return { latitude: firstResult.latitude, longitude: firstResult.longitude };
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return null;
  }
}

async function fetchWeatherForecast() {
  const location = await fetchWeatherData();
  if (!location || typeof location.latitude === "undefined" || typeof location.longitude === "undefined") {
    console.error("Failed to get valid latitude and longitude from geocoding API.");
    return null;
  }
  const { latitude, longitude } = location;

  try {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain,snowfall`
    );

    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      console.error("Weather data does not contain 'current' property.");
      return null;
    }

    return {
      temperature: weatherData.current.temperature_2m,
      humidity: weatherData.current.relative_humidity_2m,
      windSpeed: weatherData.current.wind_speed_10m,
      rain: weatherData.current.rain,
      snowfall: weatherData.current.snowfall }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

fetchWeatherForecast().then(result => {
  if (result) {
    console.log("Weather Forecast:", result);
  } else {
    console.error("Failed to fetch weather forecast.");
  }
}).catch(error => {
  console.error("Error in fetchWeatherForecast:", error);
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})
