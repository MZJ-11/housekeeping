import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css';
// import axios from "axios";
import VueRouter from 'vue-router';
import router from './router';
import API from '@/api';
import VDistpicker from 'v-distpicker'
// Vue.prototype.$axios=axios;
// Vue.prototype.$httpUrl='http://localhost:8080'
Vue.config.productionTip = false
//Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.prototype.$API =API;
Vue.use(ElementUI,{size:'small'});
Vue.component('v-distpicker', VDistpicker);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
