/**
 * Created by Administrator on 2018/3/30.
 */
//书写关于posts的路由信息

var express = require('express'); //创建一个express应用
var router = express.Router();  //创建一个router的路由

//加载必要的插件
var checkLogin = require('../middlewares/check').checkLogin;

//GET /posts 所有用户或者特定用户的文章页
// eg：GET /posts?author=xxx
router.get('/',function(req,res,next){
    res.send(req.flash());
});

//POST /posts 发表一篇文章
router.post('/',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/create 发表文章页
router.get('/create',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/:postId  单独一篇文章页
router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/:postId/edit 更新文章页
router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//POST /posts/:postId/edit 更新一篇文章
router.post('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment',checkLogin,function(req,res,next){
    res.send(req,flash());
});

//GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove',checkLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports = router;

