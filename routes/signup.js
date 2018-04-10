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
    const name = req.fields.name;
    const gender = req.fields.gender;
    const bio = req.fields.bio;
    console.log("11111");

    console.log(req.fields.avatar);
    const avatar = req.fields.avatar.path.split(path.sep).pop();
    console.log('222');
    let password = req.fields.password;
    const repassword = req.fields.repassword;

    //����У�����
    try{
        if(!(name.length >= 1 && name.length <= 10)){
            throw new Error('������������1-10���ַ�')
        }

        if(['m','f','x'].indexOf(gender) === -1){
            throw new Error('�Ա�ֻ���� m��f ���� x')
        }

        if(!(bio.length >= 1 && bio.length <= 30)){
        	throw new Error('���˼�����������1-30���ַ�')
        }

        if(!req.files.avatar.name){
        	throw new Error('��������6���ַ�')
        }

        if(password !== repassword){
        	throw new Error('�����������벻һ��')
        }
        
    }catch(e){
    	//ע��ʧ�ܣ��첽ɾ���ϴ���ͷ��
    	fs.unlink(req.files.avatar.path);
        req.flash('error', e.message);
        return res.redirect('/signup');
    }

    //�����������
    password = sha1(password);

    //��д�����ݿ���û���Ϣ
    let User = {
        name: name,
        password: password,
        gender: gender,
        bio: bio,
        avatar: avatar
    }



    //�û���Ϣд�����ݿ�
    UserModel.create(user)
        .then(function(result){
            //��user�ǲ���mongodb��ֵ������ _id
            console.log("����ע��");
            user = result.ops[0];
            //ɾ����������������Ϣ������Ϣ����session
            delete user.password;
            req.session.user = user;
            //д��flash
            req.flash('success','ע��ɹ�');
            //��ת����ҳ
            res.redirect('/posts');
        })
        .catch(function(e){
            //ע��ʧ�ܣ��첽ɾ���ϴ���ͷ��
            fs.unlink(req.files.avatar.path);
            //�û�����ռ�������ص�ע��ҳ�������Ǵ���ҳ
            if(e.message.match('duplicate key')){
                req.flash('error','�û��ѱ�ռ��');
                return res.redirect('/signup');
            }
            next(e);
        })
});

module.exports = router;