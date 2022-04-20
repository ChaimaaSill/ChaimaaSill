// // // const sqlite3 = require('sqlite3').verbose();
// // // const db = new sqlite3.Database(':memory:');
const moment = require('moment');

// // // db.serialize(() => {
// // //     db.run("CREATE TABLE users (username varchar, password varchar)");
  
// // //     var stmt = db.prepare("INSERT INTO users VALUES (?,?)");
// // //     stmt.run("Chaimaa Sillahi, user1");
// // //     stmt.run("Amine Khayer, user2");
// // //     stmt.run("Jhon Smith, user3");
// // //     stmt.finalize();
// // //   });
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

module.exports = class User {
    constructor(username, password, key){
        this.username = username;
        this.password = password;
        this.key = key;
    }

    static login(username,password){

        // if (username && password) {
        //     // Execute SQL query that'll select the account from the database based on the specified username and password
        //     connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
        //         // If there is an issue with the query, output the error
        //         if (error) throw error;
		// 	// If the account exists
		// 	if (results.length > 0) {
		// 		// Authenticate the user
		// 		request.session.loggedin = true;
		// 		request.session.username = username;
		// 		// Redirect to home page
		// 		response.redirect('/home');
		// 	}
        //     });
        // }
        const user = users.find(user => user.username == username && user.password == password);
        if(user){
            return {Generated :`${username}` + moment().format()};
        }else{
            return {error : "Incorrect Username and/or Password!"};
        }
    }
}

