var models = require('../models');
var express = require('express');
var parser = require('body-parser');
var bluebird = require('bluebird');
var app = express();

module.exports = {
  messages: {
    get: function (req, res) {
      models.messages.get(req, res);
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('messages.posting');
      app.use(parser.json());
      models.messages.post(req.body);
      res.end('received');
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      console.log('users.posting');
      app.use(parser.json());
      models.users.post(req.body);
      res.end('received');
    }
  }
};

