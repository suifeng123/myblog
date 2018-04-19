/**
 * Created by Administrator on 2018/4/19.
 */
//服务接口的入口文件
//引入编写好的api
const api = require('./api');
//引入文件
const fs = require('fs');
//引入处理路径的模块
const path = require('path');
//引入处理数据的post模
const bodyParser = require('body-parser');
//引入express
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(api);
//访问静态资源文件，这里是访问所有dist目录下的静态文件
/**
app.use(express.static(path.resolve(__dirname,'../dist')));
//因为是单页面，所有请求都
app.get('*',function(req,res){
  const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8');
  res.send(html)
});
**/

//监听8000
app.listen(8088);
console.log('success listening on port 8088');
