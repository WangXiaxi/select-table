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
      {path: '/date', component: () => import('@/view/date/index'), name: 'date', meta: { title: 'date-time' }},
      {path: '/home', component: () => import('@/view/home/index'), name: 'home', meta: { title: 'select-table' }},
      {path: '/page-hoc-1', component: () => import('@/view/page-hoc/one'), name: 'page-hoc-1', meta: { title: 'page-hoc-1' }},
      {path: '/page-hoc-2', component: () => import('@/view/page-hoc/two'), name: 'page-hoc-2', meta: { title: 'page-hoc-2' }},
      {path: '/tree-chart', component: () => import('@/view/tree-chart/index'), name: 'tree-chart', meta: { title: 'tree-chart' }}
    ]
  }
]

export default new Router({
  mode: 'history', // require service support
  routes
})
