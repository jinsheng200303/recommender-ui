import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "@/store";

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/ManagePage',
      name: 'ManagePage',
      redirect: '/ManagePage/userManagePage',
      component: () => import('@/views/backgroundManager/ManagePage.vue'),
      children: [
        {
          path: 'userManagePage',
          name: '系统管理 / 用户管理',
          component: () => import('@/views/backgroundManager/User.vue')
        },
        {
          path: 'HomePage',
          name: '主页',
          component: () => import('@/views/backgroundManager/HomePage.vue')
        },
        {
          path: 'Role',
          name: '系统管理 / 角色管理',
          component: () => import('@/views/backgroundManager/Role.vue')
        },
        {
          path: 'Class',
          name: '课堂管理',
          component: () => import('@/views/backgroundManager/Class.vue')
        },
      ]
    },
    {
      path: '/login',
      name: 'loginRegiter',
      component: () => import('@/views/user/login_register.vue')
    },
    {
      path: '/index_content',
      name: 'index_content',
      redirect: '/index_content/home',
      component: () => import('@/views/user/index_content.vue'),
      children: [
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
        },
      ]
    },
    {
      path: '/classinfo',
      name: 'classinfo',
      component: () => import('@/views/user/classinfo.vue'),
      redirect: '/classinfo/student',
      children: [
        {
          path: '/classinfo/student',
          name: 'student',
          component: () => import('@/views/user/student.vue'),
        },
        {
          path: '/classinfo/announcement',
          name: 'announcement',
          component: () => import('@/views/user/announcement.vue'),
        },
      ]
    },
    {
      path: '/myGraph',
      name: 'graph',
      component: () => import('@/views/graph/graphTest1.vue')
    },
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem("currentPathName", to.name) // 设置当前的路由名称，为了在Header组件中去使用
  store.commit("setPath") // 触发store的数据更新
  if (to.path.startsWith('/login')) {
    window.localStorage.removeItem('token')
    next()
  } else {
    let user = window.localStorage.getItem('token')
    if (!user) {
      next({
        path: '/login'
      })
    } else {
      if(to.path == '/'){
        if (JSON.parse(window.localStorage.getItem("userInfo")).roleId == 1 || JSON.parse(window.localStorage.getItem("userInfo")).roleId == 2) {
          next({
            path: '/index_content'
          })
        }else {
          next({
            path: '/ManagePage'
          })
        }
      }
      next()
    }
  }
})

export default router