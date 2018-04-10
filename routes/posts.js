/**
 * Created by Administrator on 2018/3/30.
 */


var express = require('express'); //����һ��expressӦ��
var router = express.Router();  //����һ��router��·��


var checkLogin = require('../middlewares/check').checkLogin;


router.get('/',function(req,res,next){
    res.send(req.flash());
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

