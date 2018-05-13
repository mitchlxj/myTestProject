// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App';
import router from './router';
import store from './store';
import  Promise from 'es6-promise';
Promise.polyfill(); //兼容其他不能使用promise的浏览器

Vue.config.productionTip = false;


import 'font-awesome/css/font-awesome.css';

import elementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(elementUI);

//swal
import swal from 'sweetalert2';
Vue.$swal = Vue.prototype.$swal = swal;

//highcharts
import Highcharts from 'highcharts';
Vue.$Highcharts = Vue.prototype.$Highcharts = Highcharts;

//axios
import axios from  'axios';
Vue.$http = Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
