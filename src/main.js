import Vue from 'vue';
import App from './App.vue';
import router from './router';
import api from './api';
import store from './store';
import i18n from './i18n';
import constants from './constants';
import scripts from "./scripts";
import './libs/rem.js';
import './assets/styles/index.scss';

Vue.config.productionTip = false;

Vue.prototype.$const = constants;
Vue.prototype.$scripts = scripts;
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
