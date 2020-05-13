// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

/**
 * 1. 设置post数据格式为表单格式
 * 2. 设置基路径
 * 3. 序列化字符串
 */

 Vue.use(ElementUI);




Vue.prototype.$axios = axios;

//配置前后端数据交互的请求头：
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// 设置后台的访问地址
axios.defaults.baseURL = 'http://localhost:8989/system';
//拦截请求，并将json字符串序列化
// axios.interceptors.request.use((config) => {
//   if (config.method === 'post') {
//       config.data = qs.stringify(config.data,{arrayFormat: 'indices' });
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
