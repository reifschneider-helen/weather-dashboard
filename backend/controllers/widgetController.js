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
  if (!location || typeof location !== "string" || location.trim() === "") {
    return res
      .status(400)
      .json({ error: "Location is required an must be a non-empty string" });
  }

  try {
    const newWidget = await Widget.create({ location });
    const weatherDaten = await fetchWeatherForecast(location);
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
        const weatherDaten = await fetchWeatherForecast(widget.location);
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
    res.status(204).json({ message: "Widget deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete widget" });
  }
};

module.exports = { createWidget, getWidgets, deleteWidget };
