async function fetchGeocodingData(city) {
  try {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=5&language=de&format=json`
    );
    const geoData = await geoRes.json();
    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("No geocoding results found.");
    }
    return geoData.results.map((result) => ({
      name: result.name,
      country: result.country,
      region: result.admin1,
      latitude: result.latitude,
      longitude: result.longitude,
    }));
  } catch (error) {
    console.error("Error fetching geocoding data:", error);
    return [];
  }
}

module.exports = fetchGeocodingData;
