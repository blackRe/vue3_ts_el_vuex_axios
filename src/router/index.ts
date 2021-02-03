import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Root',
    component: () => import(/* webpackChunkName: "about" */ '../views/root/root.vue')
    
  },
  
  {
    path: '/setUser',
    name: 'setUser',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/setUser.vue')
    
  },
  {
    path: '/',
    name: 'Menu',
    component: () => import(/* webpackChunkName: "about" */ '../views/sym/menu.vue')
    
  },{
    path: '/chrilda',
    name: 'chrildA',
    component: () => import(/* webpackChunkName: "about" */ '../views/common/chrildA.vue')
    
  },{
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login/login.vue')
    
  },{
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
