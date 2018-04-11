'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  createUsersTable(db)
  .then(() => createTaskGroupsTable(db))
  .then(() => createTaskGroupUsersTable(db))
  .then(() => createTasksTable(db))
  .then(callback)
  .catch((error) => console.log(error));
};

exports.down = function(db, callback) {
  dropUsersTable(db)
  .then(() => dropTaskGroupsTable(db))
  .then(() => dropTaskGroupUsersTable(db))
  .then(() => dropTasksTable(db))
  .then(callback)
  .catch((error) => console.log(error));
};


function createUsersTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("creating users table");
    db.runSql(`CREATE TABLE IF NOT EXISTS users
      (
        id int primary key auto_increment,
        email VARCHAR(60),
        password VARCHAR(32),
        firstName VARCHAR(50),
        lastName VARCHAR(50),
        timezone TINYINT
      )`,
    function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function dropUsersTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("dropping users table");
    db.dropTable('users', function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function createTaskGroupsTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("creating taskGroups table");
    db.runSql(`CREATE TABLE IF NOT EXISTS taskGroups
      (
        id int primary key auto_increment,
        name VARCHAR(50),
        color CHAR(7)
      )`,
    function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function dropTaskGroupsTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("dropping taskGroups table");
    db.dropTable('taskGroups', function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function createTaskGroupUsersTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("creating taskGroupUsers table");
    db.runSql(`CREATE TABLE IF NOT EXISTS taskGroupUsers
      (
        id int primary key auto_increment,
        groupId INT,
        userId INT,
        FOREIGN KEY (userId) REFERENCES users(id),
        FOREIGN KEY (groupId) REFERENCES taskGroups(id)
      )`,
    function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function dropTaskGroupUsersTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("dropping taskGroupUsers table");
    db.dropTable('taskGroupUsers', function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function createTasksTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("creating createTasks table");
    db.runSql(`CREATE TABLE IF NOT EXISTS tasks
      (
        id int primary key auto_increment,
        groupId INT,
        name VARCHAR(50),
        color CHAR(7),
        intervals INT,
        customIntervalDays INT,
        lastDate DATE,
        nextDate DATE,
        notes TEXT,
        inactive BOOLEAN,
        FOREIGN KEY (groupId) REFERENCES taskGroups(id)
      )`,
    function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}

function dropTasksTable(db) {
  return new Promise(function(resolve, reject) {
    console.log("dropping tasks table");
    db.dropTable('tasks', function(err) {
      if (err) return reject(err);
      resolve();
    });
  });
}
