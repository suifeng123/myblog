/**
 * Created by Administrator on 2018/3/31.
 */
//������д���ڵ�¼��·����Ϣ
var express = require('express');
var router = express.Router(); //��ȡ��Ҫ��·�ɵĲ���

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signin ��¼ҳ
router.get('/',checkNotLogin,function(req,res,next){
    res.send(req.flash());
});


//POST /signin �û���¼
router.post('/',checkNotLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports = router;