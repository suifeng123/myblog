/**
 * Created by Administrator on 2018/4/16.
 */
var mongodb = require('./db');

function User(user){
    this.user = user.name;
    this.password = user.password;
    this.email = user.email;
};

module.exports = User;

//storage the user information
User.prototype.save = function(callback){
    var user = {
        name: this.name,
        password: this.password,
        email: this.email
    };
    //open database
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            collection.insert(user,{
                safe:true
            },function(err,user){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null,user[0]);
            });

        });
    });
};

//读取用户的信息
User.get = function(name,callback){
    //打开数据库
    console.log("寻找name");
    console.log(name);
    mongodb.open(function(err,db){
        if(err){
            return callback(err);//返回错误，返回err信息
        }
        //读取users的集合的信息
        db.collection('users',function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);//错误，返回err信息
            }
            //查找用户名（name键)值为name的一个温江
            collection.findOne({
                name: name
            },function(err,user){
                console.log("进行了数据库的查询")
                mongodb.close();
                if(err){
                    return callback(err);//失败  返回err信息
                }
                callback(null,user);//查询成功，返回查询 的信息
            });
        });
    });
};