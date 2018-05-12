const mysql = require('mysql');
const sqlHelper = require('./mySqlHelper');
const mysqlServers = require('./mysqlServers');
const logger = require('../logger');
const globalPath = require('../globalPath');

const mysqlErrorLogger = logger.mysqlErrorLogger;
const fileErrorLogger = logger.fileErrorLogger;
const mainDB = new sqlHelper(mysql.createPool(mysqlServers.sqlDB),globalPath,mysqlErrorLogger,fileErrorLogger);

module.exports = mainDB;