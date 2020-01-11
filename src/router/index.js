import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard'
import Manage from '../views/Manage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path:'/money',
    name: 'money',
    component: Manage,
  },
]

const router = new VueRouter({
  routes
})

export default router
