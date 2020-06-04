// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {setCookie, getCookie, delCookie} from './assets/js/cookie'

 Vue.use(ElementUI);

Vue.prototype.$axios = axios;


//配置前后端数据交互的请求头：
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

//允许axios的头部携带cookie
axios.defaults.withCredentials=true;
// 设置后台的访问地址
axios.defaults.baseURL = 'http://localhost:8989/system';
// axios 配置

axios.defaults.timeout = 5000;

// http request 拦截器，通过这个，我们就可以把Cookie传到后台

// axios.interceptors.request.use(
//   config => {
//     const token = getCookie('session'); //获取Cookie
//     // config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/json;charset=UTF-8' //设置跨域头部
//     };
//     if (token) {
//       config.params = {'token': token} //后台接收的参数，后面我们将说明后台如何接收
//     }
//      return config;
//   },
//   err => {
//     return Promise.reject(err);
//   }
// );

// http response 拦截器

// axios.interceptors.response.use(
//   response => {
// //response.data.errCode是我接口返回的值，如果值为2，说明Cookie丢失，然后跳转到登录页，这里根据大家自己的情况来设定
//     if(!response.data.state) {
//       router.push({
//         path: '/login',
//         query: {redirect: router.currentRoute.fullPath} //从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error.response.data)
//   });

// router.beforeEach((to, from, next) => {
//   if(to.meta.requireAuth) {
//     fetch('m/is/login').then(res => {
//       if(res.errCode == 200){
//         next();
//       }else{
//         if(getCookie('SESSIONID')){
//           delCookie('SESSIONID');
//         }
//         if(getCookie('account')){
//           delCookie('account');
//         }
//         next({
//           path:'/'
//         });
//       }
//     })
//   }else{
//     next();
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
