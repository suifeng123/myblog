/**
 * Created by Administrator on 2018/4/1.
 */
//使用mongo的使用的各种配置
const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);
