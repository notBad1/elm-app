import Vue from 'vue';
import App from './App';
import vueRouter from './router';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vueRouter,
  render: h => h(App)
});
