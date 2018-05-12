const globalPath = require('./globalPath');
const path = require('path');
const fs = require('fs');
const moment = require('moment');

const appDir = globalPath.appDir;
const logPath = path.join(appDir,"./logs");

const exceptionLogPath = path.join(logPath , '/exception');
const mysqlLogPath = path.join(logPath , '/mysql');
const fsLogPath = path.join(logPath , '/fs');
const smsLogPath = path.join(logPath , '/sms');

globalPath.makePath(logPath);
globalPath.makePath(exceptionLogPath);
globalPath.makePath(mysqlLogPath);
globalPath.makePath(fsLogPath);
globalPath.makePath(smsLogPath);

let fileLogStream,mysqlLogStream,smsLogStream,exceptionLogStream;

exports.fileErrorLogger =function(err) {
    if(!fileLogStream || !fileLogStream.writable || fileLogStream.path.indexOf(moment().format('YYYY-MM-DD'))===-1)
        fileLogStream = fs.createWriteStream(fsLogPath+'/'+ moment().format('YYYY-MM-DD')+'.log', {flags: 'a'});
    fileLogStream.write('\r\n' + moment().format('YYYY-MM-DD HH:mm:ss')+" | " +err.toString());
};

exports.mysqlErrorLogger=function(err) {
    if(!mysqlLogStream || !mysqlLogStream.writable || mysqlLogStream.path.indexOf(moment().format('YYYY-MM-DD'))===-1)
        mysqlLogStream = fs.createWriteStream(mysqlLogPath+'/'+ moment().format('YYYY-MM-DD')+'.log', {flags: 'a'});
    mysqlLogStream.write('\r\n' +moment().format('YYYY-MM-DD HH:mm:ss')+" | " +err.toString());
};

exports.smsErrorLogger=function(err) {
    if(!smsLogStream || !smsLogStream.writable || smsLogStream.path.indexOf(moment().format('YYYY-MM-DD'))===-1)
        smsLogStream = fs.createWriteStream(smsLogPath+'/'+ moment().format('YYYY-MM-DD')+'.log', {flags: 'a'});
    smsLogStream.write('\r\n' + moment().format('YYYY-MM-DD HH:mm:ss')+" | " +err.toString());
};


exports.exceptionLogger=function(err) {
    if(!exceptionLogStream || !exceptionLogStream.writable || exceptionLogStream.path.indexOf(moment().format('YYYY-MM-DD'))===-1)
        exceptionLogStream = fs.createWriteStream(exceptionLogPath+'/'+ moment().format('YYYY-MM-DD')+'.log', {flags: 'a'});
    exceptionLogStream.write('\r\n' + moment().format('YYYY-MM-DD HH:mm:ss')+" | " +err.toString());
};
