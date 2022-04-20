const songs = [
    {
      id: "1",
      title: '"Bad Habit" Ed Sheeran',
      releaseDate: "25 juin 2021",
      link:
        "https://drive.google.com/uc?export=download&id=1ZtgfZzqg8L-Eb__ccioPmRodcOr0LIv9"
    },
    {
      id: "2",
      title: '"Dynamite" BTS',
      releaseDate: "21 août 2020",
      link:
        "https://drive.google.com/uc?export=download&id=1oXH1v8vJRuRUZ3_2VuzlJFxEyuTcK4rO"
    },
    {
      id: "3",
      title: '"STAY" The Kid Laroi',
      releaseDate: "9 juillet 2021",
      link:
        "https://drive.google.com/uc?export=download&id=1Oxn3B1fRn6RrghvyutSjmG4hcj-I3tYX"
    },
  ];

  function getMyList() {
    return songs;
}
  
  function lookupSongs(titre){
    titre = titre.toLowerCase();
    return songs.filter(s => s.title.toLowerCase().includes(titre));
  }
  
  module.exports = { getMyList, lookupSongs};
  