import Vue from 'vue'
import Router from 'vue-router'
import Layout from "./../views/layout/Layout";
import AppMain from "./../views/layout/AppMain";
const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
export const constantRouterMap = [{
  path: '/login',
  name: 'login',
  hidden: true,
  component: _import('login/index')
}]
export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
export const asyncRouterMap = [
  {
    path: '/',
    redirect: '/user/index',
    hidden: true,
  }, {
  path: '/user',
  name: '用户管理',
  redirect: '/user/index',
  component: Layout,
  hidden: false,
  children: [{
    path: 'index',
    component: _import('user/index'),
    name: '所有用户列表'
  }]
}]
