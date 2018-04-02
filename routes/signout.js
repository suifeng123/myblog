/**
 * Created by Administrator on 2018/3/31.
 */
//用于用户注册时的路由信息
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//GET /signout 登出
router.get('/',checkLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports = router;