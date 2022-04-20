const songs = require("./song");

const songList = [];

function getAllMySongsList() {
  return songs.getMyList().filter(song => songList.includes(song.id));
}

function addSongToMySongList(id) {
  songList.push(id);
}

function deleteSongFromMySongList(id) {
    songList.pop(id);
}

module.exports = { getAllMySongsList, addSongToMySongList, deleteSongFromMySongList };
