const express = require('express');
const router = express.Router();
const models = require("../models");
const JSONRet = require('../myUtil/JSONRet');
const errCode = require('../myUtil/errCode');
const svgCaptcha = require('svg-captcha');

/* GET users listing. */


router.post('/login',login);
router.post('/regist',regist);
router.get('/enCode',enCode);

function login(req,res){

}

function regist(req,res){

}

function enCode(req,res){
    const codeConfig = {
        size:4,
        ignoreChars: 'qwertyuioplkjhgfdsazxcvbnm', // 验证码字符中排除 0o1i
        noise: 4, // 干扰线条的数量
        //color: true,
        fontSize:32,
        height:33
    };

    const captcha = svgCaptcha.create(codeConfig);
    const codeData = {
        status:true,
        data:{img:captcha.data}
    };

    //req.session.enCode=captcha.text.toLowerCase();

    return res.json(new JSONRet(errCode.success("@成功"),codeData));

}


module.exports = router;
