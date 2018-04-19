/**
 * Created by Administrator on 2018/4/19.
 */
//服务接口的api文件
const models = require('./db');
const express = require('express');
const router = express.Router();

router.post('/api/login/createAccount',(req,res) => {
  //这里 req.body 能够使用就在 index.js 中引入了
   let newAccount = new models.Login({
     account: req.body.account,
     password: req.body.password
   });
   //保存数据newAccount 数据仅MongoDB
     newAccount.save((err,data) =>{
       if(err){
          res.send(err);
       }else{
          res.send('Create Account succeed');
       }

     });
});

//获取已有账号的接口
router.get('/api/login/getAccount',(req,res) => {
     //通过模型 去查找数据库
    models.Login.find((err,data) => {
       if(err){
          res.send(err);
       }else{
          res.send(data);
      }
   });
});

module.exports = router;
