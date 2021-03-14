import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/list',
    component: Layout,
    children: [
      {
        path: 'list',
        component: () => import('@/views/videos/index.vue'),
      },
      {
        path: 'detail/:id',
        name: 'video-detail',
        props: true,
        component: () => import('@/views/videos/components/VideoPlay.vue'),
      },
    ],
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
