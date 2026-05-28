import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Products from '@/views/Products.vue'
import Coverage from '@/views/Coverage.vue'
import Login from '@/views/Login.vue'
import DashboardLayout from '@/views/dashboard/DashboardLayout.vue'
import DashboardOverview from '@/views/dashboard/DashboardOverview.vue'
import DashboardUsers from '@/views/dashboard/DashboardUsers.vue'
import DashboardOrders from '@/views/dashboard/DashboardOrders.vue'
import DashboardAccounts from '@/views/dashboard/DashboardAccounts.vue'
import DashboardPartners from '@/views/dashboard/DashboardPartners.vue'
import Knowledge from '@/views/Knowledge.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/coverage', name: 'Coverage', component: Coverage },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/dashboard',
    component: DashboardLayout,
    redirect: '/dashboard/overview',
    children: [
      { path: 'overview', name: 'DashboardOverview', component: DashboardOverview },
      { path: 'users', name: 'DashboardUsers', component: DashboardUsers },
      { path: 'orders', name: 'DashboardOrders', component: DashboardOrders },
      { path: 'accounts', name: 'DashboardAccounts', component: DashboardAccounts },
      { path: 'partners', name: 'DashboardPartners', component: DashboardPartners }
    ]
  },
  { path: '/knowledge', name: 'Knowledge', component: Knowledge }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
