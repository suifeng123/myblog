/**
 * Created by Administrator on 2018/3/30.
 */
//��д����posts��·����Ϣ

var express = require('express'); //����һ��expressӦ��
var router = express.Router();  //����һ��router��·��

//���ر�Ҫ�Ĳ��
var checkLogin = require('../middlewares/check').checkLogin;

//GET /posts �����û������ض��û�������ҳ
// eg��GET /posts?author=xxx
router.get('/',function(req,res,next){
    res.send(req.flash());
});

//POST /posts ����һƪ����
router.post('/',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/create ��������ҳ
router.get('/create',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/:postId  ����һƪ����ҳ
router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/:postId/edit ��������ҳ
router.get('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//POST /posts/:postId/edit ����һƪ����
router.post('/:postId/edit',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//GET /posts/:postId/remove ɾ��һƪ����
router.get('/:postId/remove',checkLogin,function(req,res,next){
    res.send(req.flash());
});

//POST /posts/:postId/comment ����һ������
router.post('/:postId/comment',checkLogin,function(req,res,next){
    res.send(req,flash());
});

//GET /posts/:postId/comment/:commentId/remove ɾ��һ������
router.get('/:postId/comment/:commentId/remove',checkLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports = router;

