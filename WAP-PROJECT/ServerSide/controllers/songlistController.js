const songList = require("../models/songlist");

exports.getAllMySongsList = (req, res, next) => {
    res.status(200).json(songList.getAllMySongsList());
  };

exports.addSongToMySongList = (req, res, next) => {
  res.status(200).json(songList.addSongToMySongList(req.params.songId));
};

exports.deleteSongFromMySongList = (req, res, next) => {
  res.status(200).json(playlists.deleteSongFromMySongList(req.params.songId));
};
