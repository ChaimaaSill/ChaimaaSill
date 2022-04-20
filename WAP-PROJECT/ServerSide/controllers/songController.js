const Song = require("../models/song");

exports.getMyList = (req, res, next) => {
  res.status(200).json(Song.getMyList());
};

exports.lookupSongs = (req, res, next) => {
  try{
    let hit = Song.lookupSongs(req.params.lookup);
    console.log('lookup = ',hit);
    res.json(hit);
  }catch(err){
    console.log("inside catch ",err)
  }
  
};