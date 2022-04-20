window.addEventListener("load", function () {
  if (sessionStorage.getItem("usersession")) {
      document.getElementById("playMusic").style.display="none";
      document.getElementsByClassName("homePage").style.display = "block";
      document.getElementsByClassName("homePage").style.display ="flex";
      document.getElementById("firstMsg").style.display = "none";
      document.getElementsByClassName("loginPage").style.display ="none";
      getAllMusic();
      getMyPlayList();
  } else {
      document.getElementById("playMusic").style.display="none";
      document.getElementsByClassName("homePage").style.display = "none";
      document.getElementsByClassName("homePage").style.display ="none";
      document.getElementById("firstMsg").style.display = "block";
      document.getElementById("loginPage").style.display ="flex";
  }
});

var songs = [];

class User {
  constructor(username, password, key) {
      this.username = username;
      this.password = password;
      this.key = key;
  }
}

async function login() {
  document.getElementById("errorMSG").innerText = "";
  let username = document.getElementById("input1").value;
  let password = document.getElementById("input2").value;

  if (username != "" && password != "") {
      let res = await fetch("http://localhost:3000/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              username: username,
              password: password
          })
      }).then(res => res.json());
      console.log(res);

      if (res.message) {
          document.getElementById("errorMSG").innerText = res.message;
      } else {
          document.getElementById("welcomeUser").innerText = username;
          getMyList();
          getAllMySongsList();
          sessionStorage.setItem("usersession", res.key);
          document.getElementById("playMusic").style.display="none";
          document.getElementsByClassName("homePage").style.display = "block";
          document.getElementsByClassName("homePage").style.display ="flex";
          document.getElementById("firstMsg").style.display = "none";
          document.getElementById("loginPage").style.display ="none";
      }
  }
}

async function getMyList() {
  document.getElementById("errorMSG").innerText = "";

  songs = await fetch("http://localhost:3000/songs", {
      method: "GET"
  }).then(res => res.json());

  for (let song of songs) {
      addMusicToTable(song.id, song.title, song.releaseDate);
  }
}
async function addSongToMySongList(songId) {
  await fetch("http://localhost:3000/home/" + songId, {
      method: "POST"
  }).then(res => {
    getAllMySongsList();
      return res.json();
  });
}

async function deleteSongFromMySongList(songId) {
  await fetch("http://localhost:3000/home/" + songId, {
      method: "DELETE"
  }).then(res => {
    getAllMySongsList();
      return res.json();
  });
}
async function getAllMySongsList() {
  let myList = await fetch("http://localhost:3000/home", {
      method: "GET"
  }).then(res => res.json());
  var pl = document.getElementById("table2");
  pl.innerHTML=`<tr> <th style="width: 30% ">Remove Play</th> <th style="width: 40% ">Title</th> <th style="width: 30% ">Released Date</th> </tr>`;
  for (let song of myList) {
      addRowToMyList(song.id, song.title, song.releaseDate);
  }
}

function addMusicToTable(id, title, releaseDate) {
  var table = document.getElementById("musicList");

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.insertCell(0).innerHTML =
      '<button class="btn btn-warning" onclick="AddMusicToPlayList(' +
      id +
      ')" >Favorit</button>';

  row.insertCell(1).innerHTML = title;
  row.insertCell(2).innerHTML = releaseDate;

}

function addRowToMyList(id, title, releaseDate) {
  var table = document.getElementById("table2");

  var rowCount = table.rows.length;
  var row = table.insertRow(rowCount);
  row.insertCell(0).innerHTML =
      '<button class="btn btn-danger" onclick="deleteMusicFromList(' +
      id +
      ')" style="margin-right:50px" > Remove </button> <button class="btn btn-info" onclick="playMusic(' +
      id +
      ')" > Play </button>';
  row.insertCell(1).innerHTML = title;

}

function logout() {
  document.getElementById("welcomeUser").innerText = "";
  sessionStorage.removeItem("usersession");
  document.getElementById("playMusic").style.display="none";
  document.getElementsByClassName("homePage").style.display = "none";
  document.getElementsByClassName("homePage").style.display ="none";
  document.getElementById("firstMsg").style.display = "block";
  document.getElementById("loginPage").style.display ="flex";
  //here
  document.getElementById("table1").innerHTML = 
  `<tr>
      <th style="width: 20% ">add to favoris</th>
      <th style="width: 60% ">Title</th>
      <th style="width: 20% ">releaseDate</th>
  </tr>`;

  document.getElementById("table2").innerHTML=`<tr>
                      <th style="width: 30% ">Remove Play</th>
                      <th style="width: 40% ">Title</th>
                      <th style="width: 30% ">Released Date</th>
                  </tr>`;
}

function stopMusic() {
  document.getElementById("playMusic").style.display = "none";
  document.getElementById("audio").src = "";
}
function playMusic(id) {
  document.getElementById("playMusic").style.display = "flex";
  let song = songs.filter(s => s.id == id)[0];
  console.log("Playing music ... ", song, id);
  document.getElementById("audio").src = song.link;
}

async function searchMusic() {
  console.log("searching music .. ");
  let search = document.getElementById("search").value;
  let musicList = await fetch("http://localhost:3000/songs/"+search,
      {
          method: "GET"
      }
  ).then(res => {console.log("result = ",res)
      return res.json();
  })

  document.getElementById("musicList").innerHTML = "";
  document.getElementById("musicList").innerHTML = `<tr>
                  <th style="width: 20% ">add to favoris</th>
                  <th style="width: 60% ">Title</th>
                  <th style="width: 20% ">releaseDate</th>
              </tr>`;
  for (let music of musicList) {
      addMusicToTable(music.id, music.title, music.releaseDate);
  }
}