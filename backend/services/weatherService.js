async function fetchWeatherData(city) {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=10&language=de&format=json`
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

/**
 * Fetches the current weather forecast for a given city using the Open-Meteo API.
 * @param {string} city - The name of the city to fetch weather data for.
 * @returns {Promise<Object|null>} An object containing temperature, humidity, wind speed, rain, and snowfall, or null if an error occurs.
 */

async function fetchWeatherForecast(city) {
  const location = await fetchWeatherData(city);
  if (
    !location ||
    typeof location.latitude === "undefined" ||
    typeof location.longitude === "undefined"
  ) {
    console.error(
      "Failed to get valid latitude and longitude from geocoding API."
    );
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
      snowfall: weatherData.current.snowfall,
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
}

module.exports = fetchWeatherForecast;
