/**
 * Created by Administrator on 2018/4/1.
 */
//ʹ��mongo��ʹ�õĸ�������
const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);
