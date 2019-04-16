import Home from '@/components/Home.vue'
import Login from '@/components/Login.vue'
import Scan from '@/components/Scan.vue'
import Ticket from '@/components/Ticket.vue'
import Property from '@/components/Property.vue'
import Profile from '@/components/Profile.vue'
import changePassword from '@/components/ChangePassword.vue'
import PropertyList from '@/components/PropertyList.vue'
import TicketLog from '@/components/TicketLog.vue'
import TicketList from '@/components/TicketList.vue'
import Logout from '@/components/Logout.vue'

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
    path: '/ticket/:pid/:id',
    component: Ticket
  },
  {
    path: '/prop/:id',
    component: Property
  },
  {
    path: '/process',
    component: PropertyList
  },
  {
    path: '/process/:pid',
    component: PropertyList
  },
  {
    path: '/log/:tid',
    component: TicketLog
  },
  {
    path: '/tickets',
    component: TicketList
  },
  {
    path: '/tickets/:todo',
    component: TicketList
  },
  {
    path: '/changePassword',
    component: changePassword
  },
  {
    path: '/my',
    name: 'profile',
    component: Profile
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },
  {
    path: '*',
    component: Home
  }
]
