import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Scan from '@/components/Scan.vue'
import Ticket from '@/components/Ticket.vue'
import Property from '@/components/Property.vue'
import Profile from '@/components/Profile.vue'
import changePassword from '@/components/ChangePassword.vue'

export default [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/scan',
    component: Scan
  },
  {
    path: '/scan/:pid',
    component: Scan
  },
  {
    path: '/ticket/:pid',
    component: Ticket
  },
  {
    path: '/ticket/:pid/:id',
    component: Ticket
  },
  {
    path: '/prop/:id',
    component: Property
  },
  {
    path: '/changePassword',
    component: changePassword
  },
  {
    path: '/my',
    component: Profile
  },
  {
    path: '*',
    component: Home
  }
]
