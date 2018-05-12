var express = require('express');
var router = express.Router();
const models = require("../models");
const JSONRet = require('../myUtil/JSONRet');
const errCode = require('../myUtil/errCode');

/* GET users listing. */


router.get('/testsql',testsql);

function testsql(req,res){

    let data={
        name:'mitch',
        password:'123',
    };
    models.testsql.testdb(data,function(err,result,qy){
        if(err){
            return res.json(new JSONRet(errCode.mysql(),result,qy));
        }else{
            res.json(new JSONRet(errCode.success("@成功"),result));
        }
    });
}

module.exports = router;
