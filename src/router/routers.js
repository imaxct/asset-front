import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Scan from '@/components/Scan.vue'
import Ticket from '@/components/Ticket.vue'
import Property from '@/components/Property.vue'

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
    path: '*',
    component: Home
  }
]
