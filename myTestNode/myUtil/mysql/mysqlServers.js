const process = require('process');

const logsDB = {
    production:{
        outer:{
            connectionLimit:20,
            host:'',
            user:'',
            password:'',
            multipleStatements:true
        },
        inner:{
            connectionLimit:20,
            host:'',
            user:'',
            password:'',
            multipleStatements:true
        }
    },
    development: {
        outer: {
            connectionLimit: 20,
            host: '',
            user: '',
            password: '',
            multipleStatements: true
        },
        inner: {
            connectionLimit: 20,
            host: '',
            user: '',
            password: '',
            multipleStatements: true
        }
    }
};

const mysqlDB = {
    production:{
        outer:{
            connectionLimit:20,
            host:'',
            user:'',
            password:'',
            database:'',
            multipleStatements:true
        },
        inner:{
            connectionLimit:20,
            host:'',
            user:'',
            password:'',
            database:'',
            multipleStatements:true
        }
    },
    development: {
        outer: {
            connectionLimit: 20,
            host: '127.0.0.1',
            user: 'root',
            password: 'xiaojie123',
            database:'test',
            multipleStatements: true
        },
        inner: {
            connectionLimit: 20,
            host: '',
            user: '',
            password: '',
            database:'',
            multipleStatements: true
        }
    }
};

module.exports = {
    // logsDB: logsDB[process.env.NODE_ENV][process.env.NETWORK_ENV],
    sqlDB:mysqlDB[process.env.NODE_ENV][process.env.NETWORK_ENV],
};


