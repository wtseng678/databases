DROP DATABASE chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id INT PRIMARY KEY AUTO_INCREMENT,
  message VARCHAR(255),
  user int,
  room VARCHAR(255),
  createdAt DATE,
  updatedAt DATE
);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255),
  createdAt DATE,
  updatedAt DATE
);


/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

