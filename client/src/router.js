import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search';
import userProfile from './components/userProfile';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
      //Show search page on /
    },
    {
      path: '/:platform/:name',
      component: userProfile
    }
  ]
});
