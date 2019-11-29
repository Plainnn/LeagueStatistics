import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'normalize-css';
import vuetify from './plugins/vuetify';
const axios = require('axios');

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  router,
  vuetify,

  render: h => h(App)
}).$mount('#app');
