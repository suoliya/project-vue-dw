
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource'
import store from './store/'
import {getStore,setStore} from './config/mUtils'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/styles/bootstrap.min.css'; // 引入bootstrap.css
import '../static/styles/bootstrap-reset.css'; // 引入bootstrap-reset.css
import '../static/styles/owl.carousel.css'; // owl.carousel.css
import '../static/styles/style-responsive.css'; // 引入style-responsive.css
import '../static/styles/style.css'; // 引入样式 css
import '../static/styles/media.css'; // 老式笔记本屏幕适配样式单独css
import '../static/styles/mediamobile.css'; // 移动端屏幕适配样式单独css
import '../static/js/jquery-1.8.3.min.js'; // jQuery
//import '../static/js/jquery.nicescroll.js'; // 滚动条nicesroll
import App from './App'

Vue.use(VueResource)
Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to,from,next) => {
    var loginTime = getStore('loginTime');
    if(new Date().getTime() - loginTime>1000*60*60*23){
        setStore('login', 0);
        setStore('token', null);
        setStore('userInfo', null);
        setStore('menuList', null);
        setStore('loginTime',null);
    }
    var loginstore = getStore('login');
    var token = getStore('token');
    if(to.matched.some( m => m.meta.auth)){
        // 对路由进行验证
        if(loginstore==1 && token!=null) { // 已经登陆
            next(true)     // 正常跳转到你设置好的页面
        }else{
            // 未登录则跳转到登陆界面，query:{ Rurl: to.fullPath}表示把当前路由信息传递过去方便登录后跳转回来；
　　 　　　　next({path:'/login',query:{ Rurl: to.fullPath} })
 　　　　　}
　　　　}else{
　　　　　　next()
　　}
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created: function () {
    let logins = getStore('login');
    if(logins!=1){
      this.$router.push('/login');
    }
  }
})

