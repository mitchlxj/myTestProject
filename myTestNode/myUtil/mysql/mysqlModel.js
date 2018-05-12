const _ = require("lodash");
// var mysqlMainDB = require('merchantSP-common/mysql/mainDB');
const mysqlMainDB = require('./mainDB');
const errCode=require('../errCode');

function mysqlModel(config) {
    if (!(typeof config === "object" && config.name && config.pk && config.column)) {
        throw Error("invalid config");
    }
    this.name = config.name;
    this.pk = config.pk;

    if (!Array.isArray(config.column)) {
        config.column = config.column.split(",")
    }
    this.column = config.column;

    this.createPkObj = (id)=> {
        var obj = {};
        obj[this.pk] = id;
        return obj;
    };

    this.create = (data, callback) => {
        var params = [this.name, data];
        var strSql = "insert into ?? set ?";
        mysqlMainDB.execWP(strSql, params, (err, results, query) => {
            if (err) {
                if(err.errno === 1062){
                    callback(errCode.mysql("@重复记录"), results, query);
                }
                else{
                    callback(errCode.mysql(), results, query);
                }
                return
            }
            if (!results.insertId) {
                return callback(errCode.mysql("@添加失败"), results, query);
            }
            var obj = this.createPkObj(results.insertId);
            obj.createAt = data.createAt;
            obj.createBy = data.createBy;
            callback(null,obj,query);
        });
    };

    this.update = (data, callback) => {
        var id = data[this.pk];
        if (!id) {
            return callback(errCode.mysql("@主键无效"))
        }
        delete data[this.pk];
        var params = [this.name, data, this.createPkObj(id)];
        var strSql = "update ?? set ? where ? ";
        mysqlMainDB.execWP(strSql, params, (err, results, query) => {
            if (err) {
                if(err.errno === 1062){
                    callback(errCode.mysql("@重复记录"), results, query);
                }
                else{
                    callback(errCode.mysql(), results, query);
                }
                return
            }
            callback(null, results.affectedRows,query);
        });
    };

    this.get = (id, callback) => {
        if (!id) {
            return callback(errCode.mysql("@主键无效"))
        }
        var params = [this.column, this.name, this.createPkObj(id)];
        var strSql = "select ?? from ?? where ? ";
        mysqlMainDB.execWP(strSql, params, (err, results, query) => {
            if (err) {
                return callback(errCode.mysql(), results, query);
            }
            callback(null, results.length?results[0]:null,query);
        });
    };

    this.getWhere = (data, callback) => {
        var params = [this.column, this.name  ].concat(data.params);
        var strSql = "select ?? from  ??";
        strSql+=data.strSql;
        mysqlMainDB.execWP(strSql, params, (err, results, query) => {
            if (err) {
                return callback(errCode.mysql(), results, query);
            }
            callback(null,results,query);
        });
    };

    this.find = function(option, callback)  {
        var pagination = option.pagination && typeof option.pagination.start === "number" && typeof option.pagination.size == "number";

        var params = [option.column || this.column, this.name];
        var strSql = " select ";
        if (pagination) {
            strSql += " SQL_CALC_FOUND_ROWS"
        }
        strSql += " ?? from ?? \n";
        if (option.where) {
            params = _.concat(params, option.where.params);
            strSql += option.where.strSql;
        }
        params.push(this.pk);
        strSql += " order by ?? desc \n";
        if (pagination) {
            params.push(option.pagination.start, option.pagination.size);
            strSql += " limit ?,?; select found_rows() as total; "
        }
        mysqlMainDB.execWP(strSql, params, (err, results, query) => {
            if (err) {
                return callback(errCode.mysql(), results, query);
            }
            if (pagination) {
                callback(null, {list:results[0] ? results[0] : [],total: results[1] && results[1][0] ? results[1][0].total : 0},query)
            }
            else {
                callback(null, {list:results},query)
            }
        });
    };
}

module.exports = mysqlModel;