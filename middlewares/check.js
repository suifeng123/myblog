/**
 * Created by Administrator on 2018/3/30.
 */
//���ǰ��û�״̬�ļ���װ��һ���м������ÿ����ҪȨ�޿��Ƶ�·�ɼ��ظ��м��������ʵ��ҳ���Ȩ�޿��ơ���
module.exports = {
    checkLogin: function checkLogin(req,res,next){
        if(!req.session.user){
            //����м����⵽û�е�¼
            req.flash('error','δ��¼');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin: function checkNotLogin(req,res,next){
        if(req.session.user){
            req.flash('error','�ѵ�¼');
            return res.redirect('back'); //����֮ǰ��ҳ��
        }
        next();
    }
}