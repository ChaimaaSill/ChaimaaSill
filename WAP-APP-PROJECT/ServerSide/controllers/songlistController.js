const playlists = require("../models/songlist");

exports.getAllMySongsList = (req, res, next) => {
    res.status(200).json(playlists.getAllMySongsList());
};

exports.addSongToMySongList = (req, res, next) => {
  res.status(200).json(playlists.addSongToMySongList(req.params.musicId));
};

exports.deleteSongFromMySongList = (req, res, next) => {
  res.status(200).json(playlists.deleteSongFromMySongList(req.params.musicId));
};