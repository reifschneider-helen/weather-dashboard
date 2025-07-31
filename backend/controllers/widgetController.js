const Widget = require("../models/Widget");

const createWidget = async (req, res) => {
  const { location } = req.body;

  try {
    const newWidget = await Widget.create({ location });
    res.status(201).json(newWidget);
  } catch (error) {
    res.status(500).json({ error: "Failed to create widget" });
  }
};

const getWidgets = async (req, res) => {
  try {
    const widgets = await Widget.find().sort({ createdAt: -1 });
    res.json(widgets);
  } catch (error) {
    res.status(500).json({ error: "Failed to catch widges" });
  }
};

const deleteWidget = async (req, res) => {
  const id = req.param.id;

  try {
    await Widget.findByIdAndDelete({ id });
    res.status(204).json({ message: "Widget deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete widget" });
  }
};

module.exports = { createWidget, getWidgets, deleteWidget };
