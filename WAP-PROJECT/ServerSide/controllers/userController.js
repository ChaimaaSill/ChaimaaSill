const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username,password);
    res.status(200).json(User.login(username,password));
}
