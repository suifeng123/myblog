/**
 * Created by Administrator on 2018/3/31.
 */
//����û�ע�����Ϣ
const fs = require('fs');
const sha1 = require('sha1');
//����avatar path�Ĺ۵�
const path = require('path');
const express = require('express');
const router = express.Router();

const UserModel = require('../models/users');
const checkNotLogin = require('../middlewares/check').checkNotLogin;



//GET /signup ע��ҳ
router.get('/',function(req,res,next){
    res.render('signup');
});

//POST /signup ע��ҳ
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

    //����У�����
    try{
        if(!(name.length >= 1 && name.length <= 10)){
            throw new Error('Please limit the name to 1-10 characters')
        }

        if(['m','f','x'].indexOf(gender) === -1){
            throw new Error('Gender limited to  m��f or x')
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
    	//ע��ʧ�ܣ��첽ɾ���ϴ���ͷ��
        console.log('1111423');
    	fs.unlink(req.files.avatar.path);
        console.log("the signup error");
        console.log(e.message);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }

    //�����������
    password = sha1(password);

    //��д�����ݿ���û���Ϣ
    var user = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    };



    //�û���Ϣд�����ݿ�
    UserModel.create(user)
        .then(function(result){
            //��user�ǲ���mongodb��ֵ������ _id
            console.log("sing8888");
            console.log(result);
            user = result.ops[0];
            //ɾ����������������Ϣ������Ϣ����session
            delete user.password;
            req.session.user = user;
            //д��flash
            console.log('9999')
            req.flash('success','signup success');
            //��ת����ҳ
            console.log('sdfasdf')
            return res.redirect('/posts');
        })
        .catch(function(e){
            console.log('4444');
            //ע��ʧ�ܣ��첽ɾ���ϴ���ͷ��
            fs.unlink(req.files.avatar.path);
            //�û�����ռ�������ص�ע��ҳ�������Ǵ���ҳ
            if(e.message.match('duplicate key')){
                req.flash('error','the user is fixed');
                return res.redirect('/signup');
            }
            next(e);
        });
});

module.exports = router;