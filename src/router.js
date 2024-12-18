import { createRouter, createWebHashHistory } from 'vue-router'
import { authGuard } from '@bcwdev/auth0provider-client'
import { AppState } from './AppState.js';

function loadPage(page) {
  return () => import(`./pages/${page}.vue`)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: loadPage('HomePage')
  },
  {
    path: '/about',
    name: 'About',
    component: loadPage('AboutPage')
  },
  {
    path: '/account',
    name: 'Account',
    component: loadPage('AccountPage'),
    beforeEnter: authGuard
  },
  {
    path:'/profile',
    name: 'Profile',
    component: loadPage('ProfilePage'),
  },
  {
    path: '/search-results',
    name: 'Search',
    component: loadPage('SearchPage')
  }
]

export const router = createRouter({
  linkActiveClass: 'router-link-active',
  linkExactActiveClass: 'router-link-exact-active',
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
});

router.beforeEach((to, from, next) => {
  if (from.name === 'Profile' && to.name !== 'Profile') {
    AppState.Posts = [];
    AppState.totalPages = null;
    AppState.activeProfile = null;
    localStorage.removeItem('activeProfileId');
  }
  next();
})
