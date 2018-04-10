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
    const name = req.fields.name;
    const gender = req.fields.gender;
    const bio = req.fields.bio;
    console.log("11111");

    console.log(req.fields.avatar);
    const avatar = req.fields.avatar.path.split(path.sep).pop();
    console.log('222');
    let password = req.fields.password;
    const repassword = req.fields.repassword;

    //进行校验参数
    try{
        if(!(name.length >= 1 && name.length <= 10)){
            throw new Error('姓名请限制在1-10个字符')
        }

        if(['m','f','x'].indexOf(gender) === -1){
            throw new Error('性别只能在 m、f 或者 x')
        }

        if(!(bio.length >= 1 && bio.length <= 30)){
        	throw new Error('个人简历请限制在1-30个字符')
        }

        if(!req.files.avatar.name){
        	throw new Error('密码至少6个字符')
        }

        if(password !== repassword){
        	throw new Error('两次输入密码不一致')
        }
        
    }catch(e){
    	//注册失败，异步删除上传的头像
    	fs.unlink(req.files.avatar.path);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }

    //明文密码加密
    password = sha1(password);

    //待写入数据库的用户信息
    let User = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    }



    //用户信息写入数据库
    UserModel.create(user)
        .then(function(result){
            //此user是插入mongodb后值，包含 _id
            console.log("进行注册");
            user = result.ops[0];
            //删除密码这种敏感信息，将信息存入session
            delete user.password;
            req.session.user = user;
            //写入flash
            req.flash('success','注册成功');
            //跳转到首页
            res.redirect('/posts');
        })
        .catch(function(e){
            //注册失败，异步删除上传的头像
            fs.unlink(req.files.avatar.path);
            //用户名被占用则跳回到注册页，而不是错误页
            if(e.message.match('duplicate key')){
                req.flash('error','用户已被占用');
                return res.redirect('/signup');
            }
            next(e);
        })
});

module.exports = router;