const mongoose = require("mongoose");

const widgetSchema = new mongoose.Schema(
  {
    location: {
      name: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
      country: { type: String },
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
