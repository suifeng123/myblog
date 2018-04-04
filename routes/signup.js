/**
 * Created by Administrator on 2018/3/31.
 */
//设计用户注册的信息
var express = require('express');
var router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signup 注册页
router.get('/',function(req,res,next){
    res.render('signup');
});

//POST /signup 注册页
router.post('/',function(req,res,next){
    res.send('this is signup page POST Method');
});

module.exports = router;