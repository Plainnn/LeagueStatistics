import Vue from 'vue';
import App from './App.vue';
import router from './router';
import 'normalize-css';
import vuetify from './plugins/vuetify';
import AOS from 'aos';
import 'aos/dist/aos.css';
const axios = require('axios');
import VueDraggable from 'vue-draggable';
import VueApexCharts from 'vue-apexcharts';

// Import the plugin here
import { Auth0Plugin } from './auth';

const domain = 'c';
const clientId = '2ymZyMoDjB8G95O82zUE63018YLYx1yd';
const audience = '/profile';
// Install the authentication plugin here
Vue.use(Auth0Plugin, {
  VueDraggable,
  VueApexCharts,
  domain,
  clientId,
  audience, // NEW - configure the plugin with the audience value
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.component('apexchart', VueApexCharts);

Vue.config.productionTip = false;
Vue.prototype.$http = axios;
Vue.prototype.$http.defaults.baseURL = 'http://localhost:3000/';

new Vue({
  created() {
    AOS.init({ offset: 200, delay: 100, disable: 'phone' });
  },
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app');
