import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue')
    }
  ]
})

export default router
