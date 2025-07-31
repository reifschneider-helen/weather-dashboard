const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const weatherRoutes = require("./routes/weather");
const widgetRoutes = require("./routes/widget");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/weather", weatherRoutes);
app.use("/widget", widgetRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Weather Dashboard API");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
