const cache = {};
const FIVE_MINUTES = 5 * 60 * 1000;

/**
 * Fetches weather data for given name and coordinates (with caching).
 */
async function fetchWeatherForecast({ name, latitude, longitude }) {
  if (
    !name ||
    typeof name !== "string" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    console.error("Invalid parameters for fetchWeatherForecast");
    return null;
  }

  try {
    const key = `${latitude},${longitude}`;

    if (cache[key] && Date.now() - cache[key].timestamp < FIVE_MINUTES) {
      return cache[key].data;
    }

    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain,snowfall`
    );

    if (!weatherRes.ok) {
      console.error(
        `Weather API request failed with status ${weatherRes.status}: ${weatherRes.statusText}`
      );
      return null;
    }

    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      console.error("Weather data does not contain 'current' property.");
      return null;
    }

    const formattedWeatherData = {
      location: name,
      temperature:
        typeof weatherData.current.temperature_2m === "number"
          ? Math.round(weatherData.current.temperature_2m)
          : null,
      humidity: weatherData.current.relative_humidity_2m,
      windSpeed: weatherData.current.wind_speed_10m,
      rain: weatherData.current.rain,
      snowfall: weatherData.current.snowfall,
    };

    cache[key] = {
      data: formattedWeatherData,
      timestamp: Date.now(),
    };

    return formattedWeatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

module.exports = fetchWeatherForecast;
