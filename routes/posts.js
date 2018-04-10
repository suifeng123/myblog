/**
 * Created by Administrator on 2018/3/30.
 */


var express = require('express');
var router = express.Router();


var checkLogin = require('../middlewares/check').checkLogin;


router.get('/',function(req,res,next){
    //提示注册成功
    console.log("跳转路径111");
    res.render('posts');
});


router.post('/',checkLogin,function(req,res,next){
    res.send(req.flash());
});


router.get('/create',checkLogin,function(req,res,next){
    res.send(req.flash());
});


router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});


router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});


router.post('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});


router.get('/:postId/remove',checkLogin,function(req,res,next){
    res.send(req.flash());
});


router.post('/:postId/comment',checkLogin,function(req,res,next){
    res.send(req,flash());
});


router.get('/:postId/comment/:commentId/remove',checkLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports = router;

