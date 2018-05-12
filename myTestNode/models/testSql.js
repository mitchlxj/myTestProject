const errCode = require('../myUtil/errCode');
const mainDB = require('../myUtil/mysql/mainDB');
const MysqlModel = require('../myUtil/mysql/mysqlModel');

const config = {
    name:"tableName",
    pk:"id",
    column:"column"
};

let model = new MysqlModel(config);


model.testdb = function (data,callback) {
    let params = [data.name,data.password];
    let strSql = "insert into login (name,password) values (?,?)";
    mainDB.execWP(strSql,params,function (err,result,qy) {
        if (err){
            callback(err, result,qy);
        } else{
            callback("", result,qy);
        }
    });
};

module.exports = model;

