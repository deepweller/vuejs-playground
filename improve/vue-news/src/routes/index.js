import Vue from 'vue';
import VueRouter from 'vue-router';

import UserView from '../views/UserView.vue';
import ItemView from '../views/ItemView.vue';
import createListView from '../views/CreateListView.js';
import bus from '../utils/bus.js';
import { store } from '../store/index.js';

Vue.use(VueRouter);

function routerGNaviuard(to, next) {
  bus.$emit('start:spinner');
  store.dispatch('FETCH_LIST', to.name) // this.$route.name
    .then(() => {
      bus.$emit('end:spinner');
      next();
    })
    .catch();
}

export const router = new VueRouter({
  mode: 'history', //# 해시 제거
  routes: [
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      name: 'news',
      component: createListView('NewsView'),
      beforeEnter: (to, from, next) => {
        routerGNaviuard(to, next);
      }
    },
    {
      path: '/ask',
      name: 'ask',
      component: createListView('AskView'),
      beforeEnter: (to, from, next) => {
        routerGNaviuard(to, next);
      }
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: createListView('JobsView'),
      beforeEnter: (to, from, next) => {
        routerGNaviuard(to, next);
      }
    },
    {
      path: '/user/:id',
      component: UserView
    },
    {
      path: '/item/:id',
      component: ItemView
    }
  ]
});
