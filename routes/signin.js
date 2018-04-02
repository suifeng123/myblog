/**
 * Created by Administrator on 2018/3/31.
 */
//这里书写关于登录的路由信息
var express = require('express');
var router = express.Router(); //获取必要的路由的参数

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signin 登录页
router.get('/',checkNotLogin,function(req,res,next){
    res.send(req.flash());
});


//POST /signin 用户登录
router.post('/',checkNotLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports = router;