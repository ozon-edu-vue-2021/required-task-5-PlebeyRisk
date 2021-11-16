import Vue from 'vue';
import Router from 'vue-router';

import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
    },
    {
      path: '/favorites',
      component: () => import('../views/Favorites.vue'),
    },
    {
      path: '/cart',
      component: () => import('../views/Cart.vue'),
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});
