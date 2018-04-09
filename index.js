/**
 * Created by Administrator on 2018/3/30.
 */
/*
�������Ŀ�в�����MVC�е�(ģ��(model)--��ͼ(view)--������(controller/route))
 */

var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite')(__dirname);
var routes = require('./routes');
var pkg = require('./package');

var app = express();

//����ģ��Ŀ¼
app.set('views',path.join(__dirname,'views'));
//����ģ������Ϊ ejs
app.set('view engine','ejs');

//���þ�̬�ļ�Ŀ¼
app.use(express.static(path.join(__dirname,'public')));
//session �м��
app.use(session({
    name: config.session.key, //����cookie�б���session id���ֶ�����
    secret: config.session.secret,//ͨ������secret������hashֵ�������cookie�У��Ӷ�����signedCookie��ֹ�۸�
    cookie:{
        maxAge: config.session.maxAge //����ʱ�䣬���ں�cookie�е�session id �Զ�ɾ��
    },
    store: new MongoStore({
        //��session �洢��mongodb��
        url: config.mongodb //mongodb�ĵ�ַ
    })
}));

//flash �м����������ʾ֪ͨ
app.use(flash());

//������Լ��ļ��ϴ����м��
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname,"public/img"), //�����ļ��ϴ���Ŀ¼
    keepExtensions: true   //���ڱ�����׺��
}))

//����ȫ��ģ�峣��
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}

//���ģ��������������
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})

//·��
routes(app);

//�����˿ڣ���������
app.listen(config.port,function(){
    console.log(`${pkg.name} listening no port ${config.port}`);
});

