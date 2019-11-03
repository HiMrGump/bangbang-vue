import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: Home,
        meta: {
          title: "统计"
        }
      },
      {
        path: '/member',
        name: 'member',
        component: () => import(/* webpackChunkName: "member" */ '../views/Member.vue'),
        meta: {
          title: "会员管理"
        }
      },
      {
        path: '/dict',
        name: 'dict',
        component: () => import(/* webpackChunkName: "dict" */ '../views/Dict.vue'),
        meta: {
          title: "字典管理"
        }
      },
      {
        path: '/coupon',
        name: 'coupon',
        component: () => import(/* webpackChunkName: "coupon" */ '../views/Coupon.vue'),
        meta: {
          title: "现金券管理"
        }
      },
      {
        path: '/order',
        name: 'order',
        component: () => import(/* webpackChunkName: "order" */ '../views/Order.vue'),
        meta: {
          title: "订单管理"
        }
      },
      {
        path: '/ad',
        name: 'ad',
        component: () => import(/* webpackChunkName: "ad" */ '../views/Ad.vue'),
        meta: {
          title: "广告管理"
        }
      },
      {
        path: '/evaluate',
        name: 'evaluate',
        component: () => import(/* webpackChunkName: "evaluate" */ '../views/Evaluate.vue'),
        meta: {
          title: "评价管理"
        }
      },
      {
        path: '/feedback',
        name: 'feedback',
        component: () => import(/* webpackChunkName: "feedback" */ '../views/Feedback.vue'),
        meta: {
          title: "意见反馈管理"
        }
      },
      {
        path: '/transaction',
        name: 'feedback',
        component: () => import(/* webpackChunkName: "transaction" */ '../views/Transaction.vue'),
        meta: {
          title: "财务流水"
        }
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
