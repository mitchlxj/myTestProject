const path = require('path');
const fs = require('fs');
const appDir = path.dirname(__dirname);
const appDirPath = path.dirname(appDir);

exports.appDir = appDir;
exports.appDirPath = appDirPath;

exports.makePath = function (folder) {
  let stat = null;
  try {
      stat = fs.statSync(folder);
  }catch (err) {
      fs.mkdirSync(folder);
  }
  if (stat && !stat.isDirectory()) {
      throw new Error('Directory cannot be created because an inode of a different type exists at "'+folder+'"');
  }
};