/**
 * Created by Administrator on 2018/3/31.
 */
//����û�ע�����Ϣ
var express = require('express');
var router = express.Router();

const checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signup ע��ҳ
router.get('/',function(req,res,next){
    res.render('signup');
});

//POST /signup ע��ҳ
router.post('/',function(req,res,next){
    res.send('this is signup page POST Method');
});

module.exports = router;