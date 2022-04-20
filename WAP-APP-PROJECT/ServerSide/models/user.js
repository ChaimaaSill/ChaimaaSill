const moment = require('moment');

let users = [
  {
      username : "Chaimaa Sillahi",
      password : "user1"
  },
  {
      username : "Amine Khayer",
      password : "user2"
  },
  {
      username : "John Smith",
      password : "user3"
  }
];

  module.exports = class user {
    constructor(username, password, key) {
      this.username = username;
      this.password = password;
      this.key = key;
    }
    static login(username, password) {
      const i = users.findIndex(u => u.username == username && u.password == password);
      if(i<0){
        return { message : "Incorrect Username and/or Password!" }
      }
      let k = users[i].username + " , " + moment().format() ;
      this.key = k;
      console.log("My generated string = ", k);
      return {key : k};
    }
  };