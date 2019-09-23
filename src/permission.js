import router from "./router";
import store from "./store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {getToken, removeToken, removeUserUuid} from "@/utils/auth";
import pageParams from "./store/modules/pageParams"; // validate permission

const whiteList = ['/login','/hotelUse','/invoice','/pdfGroupNotice','/orderDetail','/tripAndCanceled','/inform','/productPromotion','/invoiceDistributor']
router.beforeEach((to, from, next) => {
  NProgress.start()
  if (!getToken()) {
    if (to.path === '/login' || to.path === '/register') {
      //if choose login , remove token, same logout
      removeToken()
      removeUserUuid()
      next()
      // next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        store.dispatch('GetInfo').then(res => {
          const roles = res.data.result.role
          store.dispatch('GenerateRoutes', { roles }).then(() => {
            router.addRoutes(store.getters.addRouters)
            next({ ...to })
          })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done() // End Progress
})
