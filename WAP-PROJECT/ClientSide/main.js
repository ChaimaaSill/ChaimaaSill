window.addEventListener("load", function(){
    closeAudio()
    if (sessionStorage.getItem("usersession")) {
        homePage();
        getSong();
        getMySongsList();
    } else {
        loginPage();
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
  let username = document.getElementsByClassName("input1").value;
  let password = document.getElementsByClassName("input2").value;

  if (username != "" && password != "") {
    let res = await fetch("http://localhost:3000/users/login", {
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
      getSong();
        getMySongsList();
      sessionStorage.setItem("usersession", res.key);
      homePage();
    }
  }
}
  
  async function getSong() {
    document.getElementById("errorMSG").innerText = "";
  
    songs = await fetch("http://localhost:3000/songs", {
      method: "GET"
    }).then(res => res.json());
  
    for (let song of songs) {
        addRowToHitsTable(song.id, song.title, song.releaseDate);
    }
  }
  async function addSongToMySongList(songId) {
    await fetch("http://localhost:3000/home/" + songId, {
      method: "POST"
    }).then(res => {
        getMySongsList();
      return res.json();
    });
  }
  
  async function deleteSongFromMySongList(songId) {
    await fetch("http://localhost:3000/home/" + songId, {
      method: "DELETE"
    }).then(res => {
        getMySongsList();
      return res.json();
    });
  }

  async function getMySongsList() {
    let mySongsList = await fetch("http://localhost:3000/home", {
      method: "GET"
    }).then(res => res.json());
  
    var list = document.getElementById("table2");
  
    while (list.rows.length > 1) {
      list.deleteRow(1);
    }
  
    for (let song of mySongsList) {
      addRowToMyList(song.id, song.title);
    }
  }
  
  function addRowToHitsTable(id, title, date) {
    var table = document.getElementById("table1");
  
    var rowCnt = table.rows.length;
    var row = table.insertRow(rowCnt);
  
    row.insertCell(0).innerHTML = id;
    row.insertCell(1).innerHTML = title;
    row.insertCell(2).innerHTML = date;
    row.insertCell(3).innerHTML =
      '<button onclick="addSongToMySongList(' +
      id +
      ')" style="width: 70px" >+</button>';
  }
  
  function addRowToMyList(id, title) {
    var table = document.getElementById("table2");
  
    var rowCnt = table.rows.length;
    var row = table.insertRow(rowCnt);
  
    row.insertCell(0).innerHTML = id;
    row.insertCell(1).innerHTML = title;
    row.insertCell(2).innerHTML =
      '<button onclick="deleteSongFromMySongList(' +
      id +
      ')" style="width: 70px ;margin-right:50px" > - </button> <button onclick="playSong(' +
      id +
      ')" style="width: 70px" > > </button>';
  }
  
  function logout() {
    sessionStorage.removeItem("usersession");
    beforeAuth();
    reset();
  }
  
  function reset() {
    document.getElementsByClassName("input1").value = "";
    document.getElementsByClassName("input2").value = "";
    var tb = document.getElementById("table1");
  
    while (tb.rows.length > 1) {
      tb.deleteRow(1);
    }
    var ptb = document.getElementById("table2");
  
    while (ptb.rows.length > 1) {
      ptb.deleteRow(1);
    }
  }
  
  function beforeAuth() {
    document.getElementsByClassName("homePage").style.display = "none";
    document.getElementsByClassName("loginPage").style.display = "block";
  }
  
  function closeAudio() {
    document.getElementById("audio").style.display = "none";
    document.getElementById("playbar").src = "";
  }

  function playAudio(id) {
    document.getElementById("audio").style.display = "block";
    let song = songs.filter(s => s.id == id)[0];
    console.log(song, id);
    document.getElementById("playbar").src = song.link;
  }

function loginPage() {
    document.getElementsByClassName("homePage").style.display = "block";
    document.getElementsByClassName("loginPage").style.display ="none";
} 