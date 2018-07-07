var db = require('../db');

module.exports = {
  messages: {
    get: function (cb) {
      var queryString = 'SELECT messages.id, messages.text, messages.roomname, users.username FROM messages left outer join users ON (messages.userid = users.id) ORDER BY messages.id DESC';
      db.query(queryString, function(err, results) { cb(err, results); });
    }, // a function which produces all the messages
    post: function (params, cb) {
      var queryString = 'INSERT INTO messages(text, userid, roomname) VALUE (?, (SELECT id FROM users WHERE username = ? limit 1), ?)';
      db.query(queryString, params, function(err, results) { cb(err, results); });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (cb) {
      var queryString = 'SELECT * FROM users';
      db.query(queryString, function(err, results) { cb(err, results); });
    },
    post: function (params, cb) {
      var queryString = 'INSERT INTO users(username) VALUES (?)';
      db.query(queryString, params, function(err, results) { cb(err, results); });
    }
  }
};

