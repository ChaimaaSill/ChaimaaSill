const express = require("express");
const playlistController = require("../controllers/songlistController");
const router = express.Router();

router.get("", playlistController.getAllMySongsList);
router.post("/:songId", playlistController.addSongToMySongList);
router.delete("/:songId", playlistController.deleteSongFromMySongList);

module.exports = router;