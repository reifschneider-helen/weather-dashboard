const fetchGeocodingData = require("../services/geocodingService");

/**
 * Returns city suggestions for autocomplete based on the city name.
 */
const getCitySuggestions = async (req, res) => {
  const { city } = req.params;
  try {
    const results = await fetchGeocodingData(city);

    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No cities found" });
    }

    res.json(
      results.map((result) => ({
        name: result.name,
        country: result.country,
        region: result.region,
        latitude: result.latitude,
        longitude: result.longitude,
      }))
    );
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch city suggestions." });
  }
};

module.exports = getCitySuggestions;
