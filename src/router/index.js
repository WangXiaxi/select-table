import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/view/layout'

Vue.use(Router)

const routes = [
  {
    path: '',
    component: Layout,
    redirect: 'home',
    name: 'default',
    children: [
      {path: '/home', component: () => import('@/view/home/index'), name: 'home', meta: { title: '首页' }}
    ]
  }
]

export default new Router({
  mode: 'history', // require service support
  routes
})
