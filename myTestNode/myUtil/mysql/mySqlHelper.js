const mySqlHelper = function (pool,globalPath,mysqlErrorLogger) {

    this.exec = function (strSql, callback) {
        this.execWP(strSql, [], callback);
    };

    this.execWP = function (strSql, params, callback) {

        pool.getConnection(function (err, connection) {
            if (err) {
                mysqlErrorLogger(err);
                callback(err);
            } else {
                const query = connection.query(
                    strSql, params,
                    function (err, results) {
                        connection.release();
                        if (err) {
                            mysqlErrorLogger(err+"\r\n"+query.sql);
                            callback(err, results, query.sql);
                        }else{
                            callback(err, results, query.sql);
                        }
                    }
                )
            }
        })
    };

    this.execWPEach = function (strSql, params, cbRow, cbEnd) {
        pool.getConnection(function (err, connection) {
            if (err) {
                mysqlErrorLogger(err);
                cbEnd(err);
            } else {
                const query = connection.query(strSql, params);
                let queryErr;
                query.on('error', function (err) {
                    queryErr = err;
                    mysqlErrorLogger(err+"\r\n"+query.sql);
                }).on('result', function (row) {
                    cbRow(row)
                }).on('end', function () {
                    cbEnd(queryErr, query.sql);
                    connection.release();
                })
            }
        })
    };

    this.execWPTRAN = function (strSql, params, callback) {
        pool.getConnection(function (err, connection) {
            //console.log(connection.threadId);
            if (err) {
                mysqlErrorLogger(err);
                callback(err);
            }
            else {
                connection.beginTransaction(function (err) {
                    if (err) {
                        mysqlErrorLogger(err);
                        connection.release();
                        callback(err);
                        return false;
                    }

                    var query = connection.query(strSql, params, function (err, results) {
                        if (err) {
                            connection.rollback(function () {
                                mysqlErrorLogger(err+"\r\n"+query.sql);
                                connection.release();
                                callback(err, null, query.sql);
                            });
                        }
                        else {
                            connection.commit(function (err) {
                                if (err) {
                                    connection.rollback(function () {
                                        mysqlErrorLogger(err + "\r\n" + query.sql);
                                        connection.release();
                                        callback(err, null, query.sql);
                                    });
                                }
                                else {
                                    connection.release();
                                    callback(err, results, query.sql);
                                }
                            });
                        }
                    });
                });
            }
        })
    };
};

module.exports = mySqlHelper;