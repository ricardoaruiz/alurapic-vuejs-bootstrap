import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    menuLabel: 'Home'
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: () => import('./views/cadastro/Cadastro.vue'),
    menuLabel: 'Cadastro'
  },
  {
    path: '/cadastro/:id',
    name: 'alteracao',
    component: () => import('./views/cadastro/Cadastro.vue')
  },
  {
    path: '*',
    redirect: {name: 'home'}
  }
];

export default new Router({
  mode: 'history',
  routes
})
