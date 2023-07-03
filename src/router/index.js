import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: '用户管理',
      redirect: '/ManagePage',
      component: () => import('@/views/backgroundManager/ManagePage.vue'),
      children: [
         { path: 'ManagePage', name: '用户管理', component: () => import('@/views/backgroundManager/User.vue')},
      ]
    },
    {
      path: '/testPage',
      name: '主页',
      component: () => import('@/views/backgroundManager/testPage.vue')
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
      component: () => import('@/views/my.vue'),
      redirect: '/my/myclass',
      children:[
        {path:'userinfo',component:()=>import('@/views/userinfo.vue')},
        {path:'myclass',component:()=>import('@/views/myclass.vue')},
      ]
    },
    {
      path: '/courseinfo',
      name: 'courseinfo',
      component: () => import('@/views/courseinfo.vue')
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: () => import('@/views/userinfo.vue')
    },
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name)  // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath")  // 触发store的数据更新
  next()  // 放行路由
})

export default router
