const express = require("express");
const songlistController = require("../controllers/songlistController");

const router = express.Router();

router.get("", songlistController.getAllMySongsList);
router.post("/:songId", songlistController.addSongToMySongList);
router.delete("/:songId", songlistController.deleteSongFromMySongList);

module.exports = router;