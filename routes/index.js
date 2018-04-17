module.exports = function(app) {
  var crypto = require('crypto'),
      User = require('../models/user.js');

  app.get('/', function (req, res) {
    res.render('index', { title: '主页' });
  });
  app.get('/reg', function (req, res) {
    res.render('reg', { title: '注册' });
  });
  app.post('/reg', function (req, res) {
       console.log("展示用户注册");
       console.log(req);
        console.log(req.query);
    console.log(req.body);
      //进行用户注册的信息的写入
      var name = req.body.name;
      var password = req.body.password;
      var password_re = req.body['password-repeat'];

    //首先检查用户两次输入的密码是否一致
    if(password != password_re){
      req.flash('error','两次输入密码不一致');
      return res.redirect('/reg'); //重新跳转到登录页面
    }

    //生成密码的MD5值
    var md5 = crypto.createHash('md5');
       password = md5.update(req.body.password).digest('hex');
    var newUser = new User({
      name: name,
      password: password,
      email: req.body.email
    });
    //检查用户名是否已经存在
    User.get(newUser.name,function(err,user){
      if(err){
        req.flash('error',err);
        return res.redirect('/');
      }

      if(user){
        req.flash('error','用户已存在');
        return res.redirect('/reg'); //重新返回注册页
      }
      //如果不在在用户的话，就新增这个用户
      newUser.save(function(err,user){
        if(err){
          req.flash('error',err);
          return res.redirect('/reg');//注册失败，就重新返回注册页
        }
        req.session.user = user; //用户信息存入session中
        req.flash('success','注册成功！');
        res.redirect('/');//注册成功后返回主页
      })
    })
  });
  app.get('/login', function (req, res) {
    res.render('', { title: '登录' });
  });
  app.post('/login', function (req, res) {
  });
  app.get('/post', function (req, res) {
    res.render('post', { title: '发表' });
  });
  app.post('/post', function (req, res) {
  });
  app.get('/logout', function (req, res) {
  });
};