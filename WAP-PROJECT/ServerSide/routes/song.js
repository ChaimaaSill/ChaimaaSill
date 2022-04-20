const express = require("express");
const songController = require("../controllers/songController");

const router = express.Router();

router.get("", songController.getMyList);
router.get("/:lookup", songController.lookupSongs)

module.exports = router;