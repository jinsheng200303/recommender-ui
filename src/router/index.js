import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/index_content/home'
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

export default router
