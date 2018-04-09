/**
 * Created by Administrator on 2018/3/30.
 */
/*
在这个项目中采用了MVC中的(模型(model)--视图(view)--控制器(controller/route))
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

//设置模板目录
app.set('views',path.join(__dirname,'views'));
//设置模板引擎为 ejs
app.set('view engine','ejs');

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));
//session 中间件
app.use(session({
    name: config.session.key, //设置cookie中保存session id的字段名称
    secret: config.session.secret,//通过设置secret来计算hash值并存放在cookie中，从而产生signedCookie防止篡改
    cookie:{
        maxAge: config.session.maxAge //过期时间，过期后cookie中的session id 自动删除
    },
    store: new MongoStore({
        //将session 存储到mongodb中
        url: config.mongodb //mongodb的地址
    })
}));

//flash 中间件，用来显示通知
app.use(flash());

//处理表单以及文件上传的中间件
app.use(require('express-formidable')({
    uploadDir: path.join(__dirname,"public/img"), //用于文件上传的目录
    keepExtensions: true   //用于保留后缀的
}))

//设置全局模板常量
app.locals.blog = {
    title: pkg.name,
    description: pkg.description
}

//添加模板必需的三个变量
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
})

//路由
routes(app);

//监听端口，启动程序
app.listen(config.port,function(){
    console.log(`${pkg.name} listening no port ${config.port}`);
});

