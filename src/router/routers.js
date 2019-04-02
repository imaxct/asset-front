import HelloWorld from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Scan from '@/components/Scan.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/scan',
    name: 'scan',
    component: Scan
  }
]
