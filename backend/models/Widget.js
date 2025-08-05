const mongoose = require("mongoose");

/**
 * Mongoose schema for weather widgets.
 */
const widgetSchema = new mongoose.Schema(
  {
    location: {
      name: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      country: { type: String, required: true },
      region: { type: String },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Widget", widgetSchema);
