var db = require('../db');

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'application/json'
};

var sendResponse = function(response, data, statusCode) {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

var collectData = function(request, callback) {
  var data = '';
  request.on('data', function(chunk) {
    data += chunk;
  });
  request.on('end', function() {
    callback(JSON.parse(data));
  });
};

var message = [];

module.exports = {
  messages: {
    get: function(request, response) {
      // sendResponse(response, {results: messages});
      db.Message.findAll({
        include: [db.User]
      }).then(function(results) {
        response.send({results: results});
      });
    }, // a function which produces all the messages
    post: function(message) {
      db.User.findOrCreate({where: {username: db.User.username}}).then(function(user) {
        var params = {
          message: db.Message.message,
          userid: db.User.id,
          roomname: db.Message.room
        };
        db.Message.create(params);
      });
      // collectData(request, function(message) {
      //   message.objectId = ++objectIdCounter;
      //   message.push(message);
      //   sendResponse(response, {objectId: message.objectId}, 201);
      // });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (user) {
      var newUser = db.User.build(user);
      newUser.save().then(function() {
        console.log('user inputted');
      });
    }
  }
};

