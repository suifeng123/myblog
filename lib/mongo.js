/**
 * Created by Administrator on 2018/4/1.
 */
//使用mongo的使用的各种配置
const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

//我们只存储用户的名称、密码（加密后的密码),头像，性别和个人简介这个
//字段，对应修改lib/mongo.js

exports.User = mongolass.model('User',{
    name: {type: 'string',required: true},
    password: { type: 'string',required: true},
    avatar: { type:'string',required: true},
    gender: {type:'string',enum:['m','f','x'],default: 'x'},
    bio: {type:'string',required:true}
})
//根据用户名找到用户，用户名全局唯一
exports.User.index({name: 1},{unique: true}).exec()
