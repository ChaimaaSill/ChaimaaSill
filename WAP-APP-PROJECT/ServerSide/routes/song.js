const express = require("express");
const musicController = require("../controllers/songController");
const router = express.Router();

router.get("", musicController.getMyList);
router.get("/:lookupSongs",musicController.lookupSongs);

module.exports = router;
