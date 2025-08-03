const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    if (process.env.NODE_ENV !== "test") {
      console.log("MongoDB connected");
    }
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
  }
};

module.exports = connectDB;
