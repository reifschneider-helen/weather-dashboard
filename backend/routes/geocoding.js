const express = require("express");
const getCitySuggestions = require("../controllers/geocodingController");

const router = express.Router();

router.get("/:city", getCitySuggestions);

module.exports = router;
