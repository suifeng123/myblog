/**
 * Created by Administrator on 2018/4/1.
 */
//ʹ��mongo��ʹ�õĸ�������
const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);

//����ֻ�洢�û������ơ����루���ܺ������),ͷ���Ա�͸��˼�����
//�ֶΣ���Ӧ�޸�lib/mongo.js

exports.User = mongolass.model('User',{
    name: {type: 'string',required: true},
    password: { type: 'string',required: true},
    avatar: { type:'string',required: true},
    gender: {type:'string',enum:['m','f','x'],default: 'x'},
    bio: {type:'string',required:true}
})
//�����û����ҵ��û����û���ȫ��Ψһ
exports.User.index({name: 1},{unique: true}).exec()
