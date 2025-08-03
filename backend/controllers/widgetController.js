const Widget = require("../models/Widget");
const fetchWeatherForecast = require("../services/weatherService");

function cleanWidget(widget) {
  const obj = widget.toObject();
  obj.id = obj._id;
  delete obj._id;
  return obj;
}

const createWidget = async (req, res) => {
  const { location } = req.body;

  if (
    !location ||
    typeof location !== "object" ||
    !location.name ||
    typeof location.name !== "string" ||
    typeof location.latitude !== "number" ||
    typeof location.longitude !== "number"
  ) {
    return res
      .status(400)
      .json({ error: "Location is required an must be a non-empty string" });
  }

  try {
    const newWidget = await Widget.create({ location });

    const weatherDaten = await fetchWeatherForecast({
      name: location.name,
      latitude: location.latitude,
      longitude: location.longitude,
      country: location.country,
      region: location.region,
    });
    const widgetObj = cleanWidget(newWidget);
    const fullWeatherDaten = { ...widgetObj, weather: weatherDaten };

    res.status(201).json(fullWeatherDaten);
  } catch (error) {
    res.status(500).json({ error: "Failed to create widget" });
  }
};

const getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find().sort({ createdAt: -1 });
    const fullWeatherDaten = await Promise.all(
      widgets.map(async (widget) => {
        const { name, latitude, longitude } = widget.location;
        const weatherDaten = await fetchWeatherForecast({
          name,
          latitude,
          longitude,
        });
        const widgetObj = cleanWidget(widget);
        return {
          ...widgetObj,
          weather: weatherDaten,
        };
      })
    );
    res.json(fullWeatherDaten);
  } catch (error) {
    res.status(500).json({ error: "Failed to catch widgets" });
  }
};

const deleteWidget = async (req, res) => {
  const id = req.params.id;

  try {
    await Widget.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete widget" });
  }
};

module.exports = { createWidget, getWidgets, deleteWidget };
