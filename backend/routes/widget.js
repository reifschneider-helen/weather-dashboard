const express = require("express");
const {
  getWidgets,
  createWidget,
  deleteWidget,
} = require("../controllers/widgetController");

const router = express.Router();

router.get("/", getWidgets);
router.post("/", createWidget);
router.delete("/:id", deleteWidget);

module.exports = router;
