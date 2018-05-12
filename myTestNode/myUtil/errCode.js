var _ = require("lodash");

function ErrCode(code,msg){
    Error.captureStackTrace(this, this.constructor);
    this.code = code;
    this.msg = msg;
    this.message = (code==="00"?"":"["+code+"]")+msg;
}
// require('util').inherits(ErrCode, Error);

function ErrDefine(code,msg) {
    this.code = code;
    this.msg = msg;
    return function (msg) {
        let _msg = this.msg;
        if(msg){
            if(_.startsWith(msg, '@')){
                _msg = msg.substr(1);
            }
            else{
                _msg += msg;
            }
        }
        return new ErrCode(this.code,_msg);
    }.bind(this)
}

module.exports = {
    "ErrCode":ErrCode,
    "success" : new ErrDefine("00",""),
    "token" : new ErrDefine("99","无访问权限"),
    "version" : new ErrDefine("98","版本过低"),
    "permission" : new ErrDefine("97","无访问权限"),

    "undefined" : new ErrDefine("9999",""),
    "serviceConnect" : new ErrDefine("9998","无法连接服务器"),
    "serviceRespone" : new ErrDefine("9997","无法连接服务器"),
    "txn" : new ErrDefine("9996","支付失败"),

    "sys" : new ErrDefine("1001","服务器连接失败"),
    "mysql" : new ErrDefine("1002","数据库操作报错"),
    "cache" : new ErrDefine("1003","缓存连接失败"),
    "param" : new ErrDefine("1004","缺少参数"),
    "sign" : new ErrDefine("1005","无访问权限"),
    "timestamp" : new ErrDefine("1006","无访问权限"),
    "hash" : new ErrDefine("1008","密码不正确"),
    "account" : new ErrDefine("1009","无效账户"),
    "card" : new ErrDefine("1010","无效卡号"),
    "bind" : new ErrDefine("1011","绑定失败"),
    "bank" : new ErrDefine("1012","无效银行"),
    "order" : new ErrDefine("1013","订单创建失败"),
    "orderPay" : new ErrDefine("1014","订单支付方式异常"),
    "orderCard" : new ErrDefine("1015","订单支付卡号异常"),
    "transaction" : new ErrDefine("1016","交易异常"),
    "transactionPayment" : new ErrDefine("1017","无效支付配置"),
    "balance" : new ErrDefine("1018","余额不足"),
    "config" : new ErrDefine("1019","设置失败"),
    "operator" : new ErrDefine("1020","操作员不存在"),
    "pos" : new ErrDefine("1021","pos编号不存在"),
    "qrcode" : new ErrDefine("1022","二维码无效"),
    "discount" : new ErrDefine("1023","消费参数有误"),
    "thirdPartyBind" : new ErrDefine("1024","尚未绑定"),
    "customer" : new ErrDefine("1025","无账户信息"),
    "merchant" : new ErrDefine("1026","商户不存在"),
    "Err" : new ErrDefine("10267","信息不正确"),
    "MyslErr" : new ErrDefine("10268","数据库连接"),
};
