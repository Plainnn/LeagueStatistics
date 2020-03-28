import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search';
import Profile from './components/Profile';
import userProfile from './components/userProfile';
import ChampionPage from './components/champion/ChampionPage';
import { authGuard } from './auth/authGuard';
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
    },
    {
      path: '/profile',
      component: Profile,
      beforeEnter: authGuard,
      name: 'Profile'
    },
    {
      path: '/champ/:key/:id',
      component: ChampionPage,
      name: 'ChampionPage'
    }
  ]
});
