const express = require("express");
const cors = require("cors");
const weatherRoutes = require("./routes/weather");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Weather Dashboard API");
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT);
});
