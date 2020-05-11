import Vue from 'vue';
import Router from 'vue-router';
import Search from './components/Search';
import Profile from './components/Profile';
import userProfile from './components/userProfile';
import ChampionPage from './components/champion/ChampionPage';
import UserCreepScore from './components/UserCreepScore';
import LeaguesPage from './components/leagues/LeaguesPage';
import ChampionPageCompare from './components/champion/ChampionPageCompare';
import AllChampions from './components/champion/AllChampions';
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
    },
    {
      path: '/champions/',
      component: AllChampions,
      name: 'AllChampions'
    },
    {
      path: '/champ/:key1/:id1/:key2/:id2',
      component: ChampionPageCompare,
      name: 'ChampionPageCompare'
    },
    {
      path: '/leagues/',
      component: LeaguesPage,
      name: 'LeaguesPage'
    },
    {
      path: '/mastery/:platform/:name',
      component: UserCreepScore,
      name: 'UserCreepScore'
    }
  ]
});
