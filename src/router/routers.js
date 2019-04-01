import HelloWorld from '@/components/HelloFromVux.vue'
import Login from '@/components/Login.vue'

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
  }
]
