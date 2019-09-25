import Vue from 'vue'
import Router from 'vue-router'
import Layout from "./../views/layout/Layout";
import AppMain from "./../views/layout/AppMain";
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [ {
  path: '/',
  name: 'login',
  component: _import('login/index')
}, {
  path: '/login',
  name: 'login',
  component: _import('login/index')
}]
export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [{
  path: '/user',
  name: 'user',
  redirect: '/user/index',
  component: Layout,
  hidden: false,
  children: [{
    path: 'index',
    component: _import('user/index'),
    name: 'userIndex'
  }]
}]
