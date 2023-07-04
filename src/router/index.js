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
      path: '/index_content',
      name: 'index_content',
      component: ()=> import('@/views/user/index_content.vue'),
      children:[
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/user/home.vue')
        },
        {
          path: 'course',
          name: 'course',
          component: () => import('@/views/user/class.vue')
        },
        {
          path: 'test',
          name: 'test',
          component: () => import('@/views/user/test.vue')
        },
        {
          path: 'my',
          name: 'my',
          component: () => import('@/views/user/my.vue'),
          // redirect: '/my/myclass',
          // children:[
          //   {path:'userinfo',component:()=>import('@/views/user/userinfo.vue')},
          //   {path:'myclass',component:()=>import('@/views/user/myclass.vue')},
          // ]
        },
      ]
    },
    {
      path: '/classinfo',
      name: 'classinfo',
      component: ()=> import('@/views/user/classinfo.vue'),
      redirect: '/classinfo/student',
      children:[
        {
          path: '/classinfo/student',
          name: 'student',
          component: ()=> import('@/views/user/student.vue'),
        },
        {
          path: '/classinfo/announcement',
          name: 'announcement',
          component: ()=> import('@/views/user/announcement.vue'),
        },
      ]
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
