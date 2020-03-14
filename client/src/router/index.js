import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../layout/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    redirect: "/home",
    meta: { title: "首页", icon: 'el-icon-location', hidden: true },
    children: [
      {
        path: 'home',
        name: 'IndexHome',
        component: () => import('../views/index.vue'),
        meta: { title: "首页" },
      }
    ]
  },

  {
    path: '/data',
    name: 'Data',
    redirect: "/data/list",
    component: Index,
    meta: { title: "数据", icon: 'el-icon-s-data' },
    children: [
      {
        path: 'list',
        name: 'DataList',
        component: () => import('../views/data/list.vue'),
        meta: { title: "数据列表" },
      },
      {
        path: 'add',
        name: 'DataAdd',
        component: () => import('../views/data/add.vue'),
        meta: { title: "添加数据" },
      },

      {
        path: 'edit',
        name: 'DataEdit',
        component: () => import('../views/data/edit.vue'),
        meta: { title: "编辑数据", hidden: true },
      }
    ]
  },
  {
    path: '/user',
    name: 'User',
    redirect: "/user/info",
    component: Index,
    meta: { title: "用户", icon: 'el-icon-user-solid' },
    children: [
      {
        path: 'info',
        name: 'UserInfo',
        component: () => import('../views/user/info.vue'),
        meta: { title: "用户信息" },
      },
      {
        path: 'edit',
        name: 'UserEdit',
        component: () => import('../views/user/edit.vue'),
        meta: { title: "编辑信息", hidden: true },
      },
      {
        path: 'list',
        name: 'UserList',
        component: () => import('../views/user/list.vue'),
        meta: { title: "用户列表" },
      }
    ]

  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/auth/register.vue'),
    meta: { title: "注册", icon: 'el-icon-menu', hidden: true }

  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/auth/login.vue'),
    meta: { title: "登录", icon: 'el-icon-document', hidden: true }
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/auth/404.vue'),
    meta: { title: "404", icon: 'el-icon-setting', hidden: true }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


// 路由守卫
router.beforeEach((to, from, next) => {

  // 如果是登陆和注册就放行
  if (to.name == 'Login' || to.name == 'Register') {
    next()
  } else {
    // 没有token就跳转到登录页
    const token = localStorage.token;
    if (token) {
      next();
    } else {
      next({ name: "Login" })
    }
  }
})

export default router
