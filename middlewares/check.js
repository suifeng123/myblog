/**
 * Created by Administrator on 2018/3/30.
 */
//我们把用户状态的检查封装成一个中间件，在每个需要权限控制的路由加载该中间件，即可实现页面的权限控制。在
module.exports = {
    checkLogin: function checkLogin(req,res,next){
        if(!req.session.user){
            //如果中间件检测到没有登录
            req.flash('error','未登录');
            return res.redirect('/signin');
        }
        next();
    },
    checkNotLogin: function checkNotLogin(req,res,next){
        if(req.session.user){
            req.flash('error','已登录');
            return res.redirect('back'); //返回之前的页面
        }
        next();
    }
}