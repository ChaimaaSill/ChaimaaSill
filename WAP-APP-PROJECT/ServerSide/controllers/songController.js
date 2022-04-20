const songs = require("../models/song");

exports.getMyList = (req, res, next) => {
    res.status(200).json(songs.getMyList());
  };
  
  exports.lookupSongs = (req, res, next) => {
  
    try{
      let search = songs.lookupSongs(req.params.lookupSongs);
      res.json(search);
    }catch(err){
      console.log("inside catch ",err);
    }
    
  };