import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/home.vue')
    },
    {
      path: '/course',
      name: 'course',
      component: () => import('@/views/course.vue')
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/test.vue')
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/my.vue')
    }
  ]
})

export default router
