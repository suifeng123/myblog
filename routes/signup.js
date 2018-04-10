/**
 * Created by Administrator on 2018/3/31.
 */
//设计用户注册的信息
const fs = require('fs');
const sha1 = require('sha1');
//关于avatar path的观点
const path = require('path');
const express = require('express');
const router = express.Router();

const UserModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;



//GET /signup 注册页
router.get('/',function(req,res,next){
    res.render('signup');
});

//POST /signup 注册页
router.post('/',checkNotLogin,function(req,res,next){
    var name = req.fields.name;
    var gender = req.fields.gender;
    var  bio = req.fields.bio;
    console.log("11111");

   // console.log(req.fields.avatar);
    var avatar = req.files.avatar.path.split(path.sep).pop();
    console.log('222');
    var  password = req.fields.password;
    var  repassword = req.fields.repassword;

    //进行校验参数
    try{
        if(!(name.length >= 1 && name.length <= 10)){
            throw new Error('Please limit the name to 1-10 characters')
        }

        if(['m','f','x'].indexOf(gender) === -1){
            throw new Error('Gender limited to  m、f or x')
        }

        if(!(bio.length >= 1 && bio.length <= 30)){
        	throw new Error('In the personal home,please limit it to 1-30 characters')
        }

        if(!req.files.avatar.name){
        	throw new Error('Lack of a head image')
        }

        if(password.length < 6){
            throw new Error('The password length is more than 6')
        }

        if(password !== repassword){
        	throw new Error('Two input passwords inconsistencies')
        }
        
    }catch(e){
    	//注册失败，异步删除上传的头像
        console.log('1111423');
    	fs.unlink(req.files.avatar.path);
        console.log("the signup error");
        console.log(e.message);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }

    //明文密码加密
    password = sha1(password);

    //待写入数据库的用户信息
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };



    //用户信息写入数据库
    UserModel.create(user)
        .then(function(result){
            //此user是插入mongodb后值，包含 _id
            console.log("sing8888");
            console.log(result);
            user = result.ops[0];
            //删除密码这种敏感信息，将信息存入session
            delete user.password;
            req.session.user = user;
            //写入flash
            console.log('9999')
            req.flash('success','signup success');
            //跳转到首页
            console.log('sdfasdf')
            return res.redirect('/posts');
        })
        .catch(function(e){
            console.log('4444');
            //注册失败，异步删除上传的头像
            fs.unlink(req.files.avatar.path);
            //用户名被占用则跳回到注册页，而不是错误页
            if(e.message.match('duplicate key')){
                req.flash('error','the user is fixed');
                return res.redirect('/signup');
            }
            next(e);
        });
});

module.exports = router;