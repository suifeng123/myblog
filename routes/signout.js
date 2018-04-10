/**
 * Created by Administrator on 2018/3/31.
 */
const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
//用于用户注册时的路由信息
var express = require('express');
var router = express.Router();

//获取一个用户
const UserModel = require('../models/users');
var checkLogin = require('../middlewares/check').checkLogin;

//GET /signout 登出
router.get('/',checkLogin,function(req,res,next){
    res.render('signup')
});

//POST /signup 用户注册


module.exports = router;