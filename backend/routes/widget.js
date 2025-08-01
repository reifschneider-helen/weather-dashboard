const express = require("express");
const {
  createWidget,
  getWidgets,
  deleteWidget,
} = require("../controllers/widgetController");

const router = express.Router();

router.post("/", createWidget);
router.get("/", getWidgets);
router.delete("/:id", deleteWidget);

module.exports = router;
