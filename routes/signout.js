/**
 * Created by Administrator on 2018/3/31.
 */
const fs = require('fs');
const path = require('path');
const sha1 = require('sha1');
//�����û�ע��ʱ��·����Ϣ
var express = require('express');
var router = express.Router();

//��ȡһ���û�
const UserModel = require('../models/users');
var checkLogin = require('../middlewares/check').checkLogin;

//GET /signout �ǳ�
router.get('/',checkLogin,function(req,res,next){
    res.render('signup')
});

//POST /signup �û�ע��


module.exports = router;