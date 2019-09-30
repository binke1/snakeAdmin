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
    redirect: 'login',
    hidden: true,
  }, {
  path: '/user',
  name: '用户管理',
  redirect: '/user/index',
  component: Layout,
  icon: 'iconyonghuguanli',
  children: [{
    path: 'index',
    component: _import('user/index'),
    name: '所有用户列表'
  }, {
    path: 'userForm',
    component: _import('user/userForm'),
    name: '添加新用户'
  }, ]
}, {
    path: '/order',
    name: '订单管理',
    redirect: '/order/index',
    component: Layout,
    icon: 'icondingdanguanli-',
    children: [{
      path: 'index',
      component: _import('order/index'),
      name: '订单列表'
    }]
  }, {
    path: '/product',
    name: '产品设置',
    redirect: '/product/index',
    component: Layout,
    icon: 'iconchanpinshezhi',
    children: [{
      path: 'index',
      component: _import('product/index'),
      name: '产品列表'
    }, {
      path: 'createProduct',
      name: '添加产品',
      component: _import('product/addProduct')
    }]
  }]
