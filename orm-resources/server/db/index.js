//var mysql = require('mysql');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'student', 'student');

var User = sequelize.define('users', {username: Sequelize.STRING});

var Message = sequelize.define('messages', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
  room: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);
User.sync();
Message.sync();
exports.User = User;
exports.Message = Message;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".


