/**
 * Created by Administrator on 2018/3/31.
 */
//�����û�ע��ʱ��·����Ϣ
var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

//GET /signout �ǳ�
router.get('/',checkLogin,function(req,res,next){
    res.send(req.flash());
});

module.exports = router;