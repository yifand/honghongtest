import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
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
import DashboardBilling from '@/views/dashboard/DashboardBilling.vue'
import Knowledge from '@/views/Knowledge.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/products', name: 'Products', component: Products },
  { path: '/coverage', name: 'Coverage', component: Coverage },
  { path: '/login', name: 'Login', component: Login, meta: { guest: true } },
  {
    path: '/dashboard',
    component: DashboardLayout,
    redirect: '/dashboard/overview',
    meta: { requiresAuth: true },
    children: [
      { path: 'overview', name: 'DashboardOverview', component: DashboardOverview, meta: { requiresAuth: true } },
      { path: 'users', name: 'DashboardUsers', component: DashboardUsers, meta: { requiresAuth: true } },
      { path: 'orders', name: 'DashboardOrders', component: DashboardOrders, meta: { requiresAuth: true } },
      { path: 'accounts', name: 'DashboardAccounts', component: DashboardAccounts, meta: { requiresAuth: true } },
      { path: 'partners', name: 'DashboardPartners', component: DashboardPartners, meta: { requiresAuth: true } },
      { path: 'billing', name: 'DashboardBilling', component: DashboardBilling, meta: { requiresAuth: true } }
    ]
  },
  { path: '/knowledge', name: 'Knowledge', component: Knowledge },
  { path: '*', name: 'NotFound', component: NotFound }
]

const router = new VueRouter({
  mode: 'hash',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = store.state.isLoggedIn

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      next({ path: '/login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest) && isLoggedIn) {
    next({ path: '/dashboard/overview', replace: true })
  } else {
    next()
  }
})

export default router
