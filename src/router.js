import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js';

import Home from './views/Home.vue'
import Registration from './views/Registration.vue'
import Login from './views/Login.vue'
import Projects from './views/Projects.vue'
import Finance from './views/Finance.vue'
import PersonalArea from './views/PersonalArea.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'createTask',
      component: Home,
      beforeEnter(to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/finance',
      name: 'finance',
      component: Finance,
      beforeEnter(to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      beforeEnter(to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/personal-area',
      name: 'personal-area',
      component: PersonalArea,
      beforeEnter(to, from, next) {
        store.getters.checkUser ? next() : next('/login')
      }
    }
  ]
})
