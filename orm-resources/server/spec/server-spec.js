/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); 
// You might need to npm install the request module!
var expect = require('chai').expect;

var db = require('../db');
var Sequelize = require('sequelize');
var sequelize = new Sequelize('chat', 'student', 'student');


describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    db.User.sync();
    // dbConnection = mysql.createConnection({
    //   user: 'student',
    //   password: 'student',
    //   database: 'chat'
    // });
    // dbConnection.connect();

    // var tablename = 'messages';
    // var tablename2 = 'users';

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    // dbConnection.query('truncate ' + tablename);
    // dbConnection.query('truncate ' + tablename2, done);
  });

  // afterEach(function() {
  //   dbConnection.end();
  // });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
      // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          user: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          room: 'Hello'
        }
      }, function () {
        // Now if we look in the database, we should find the
        // posted message there.

        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM messages';
        var queryArgs = [/*{
          user: 'Valjean',
          message: 'In mercy\'s name, three days is all I need.',
          room: 'Hello'
        }*/];

        dbConnection.query(queryString, queryArgs, function(err, results) {
          // Should have one result:
          console.log('test');
          console.log(results);
          expect(results.length).to.equal(1);

          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');

          done();
        });
      });
    });
  });

  // it('Should output all messages from the DB', function(done) {
  //   // Let's insert a message into the db
  //   var queryString = 'INSERT INTO messages SET ?';
  //   var queryArgs = [{ // fix 
  //     message: 'Men like you can never change!',
  //     user: 1364,
  //     room: 'main'
  //   }];
  //   // TODO - The exact query string and query args to use
  //   // here depend on the schema you design, so I'll leave
  //   // them up to you. */

  //   dbConnection.query(queryString, queryArgs, function(err) {
  //     if (err) { throw err; }

  //     // Now query the Node chat server and see if it returns
  //     // the message we just inserted:
  //     request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
  //       var messageLog = JSON.parse(body);
  //       expect(messageLog[0].text).to.equal('Men like you can never change!');
  //       expect(messageLog[0].roomname).to.equal('main');
  //       done();
  //     });
  //   });
  // });
});
