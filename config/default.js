/**
 * Created by Administrator on 2018/3/30.
 */
module.exports ={
    port: 3001,
    session:{
        secret: 'myblog',
        key:'myblog',
        maxAge:2592000000,

    },
    mongodb:'mongodb://localhost:27017/myblog'
}