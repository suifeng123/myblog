/**
 * Created by Administrator on 2018/4/19.
 */
//服务接口的数据库文件
const mongoose = require('mongoose');
//连接数据库
mongoose.connect('mongodb://localhost/login');

//为这次绑定连接事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection succeesed'));
/** 定义模式loginSchem ******/
const loginSchema = mongoose.Schema({
    account: String,
    password: String
});

/****   定义模型Model ****/
const Models = {
    Login: mongoose.model('Login',loginSchema)
}

module.exports = Models;
