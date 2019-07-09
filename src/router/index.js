import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld'),
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('@/components/me'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/components/Login'),
    }
  ]
})
