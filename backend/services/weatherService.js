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
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,rain,snowfall`
    );

    const weatherData = await weatherRes.json();

    if (!weatherData.current) {
      console.error("Weather data does not contain 'current' property.");
      return null;
    }

    return {
      location: name,
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
