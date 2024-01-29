import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Items from '../views/Items.vue'
import ItemDetail from '../views/ItemDetail.vue'
import Keranjang from '../views/Keranjang.vue'
import History from '../views/History.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true
  },
  {
    path: '/items',
    name: 'Items',
    component: Items,
    props: true
  },
  {
    path: '/items/:id',
    name: 'itemsDetail',
    component: ItemDetail,
    props: true,
    meta: { requiresAuth: true, role: 'User'}
  },
  {
    path: '/keranjang',
    name: 'Keranjang',
    component: Keranjang,
    props: true,
    meta: { requiresAuth: true, role: 'User'}
  },
  {
    path: '/history',
    name: 'History',
    component: History,
    meta: { requiresAuth: true, role: 'User'}
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    meta: { requiresAuth: true, role: 'Admin'}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const role = localStorage.getItem('role');
  const accessToken = localStorage.getItem('access_token');
  
  // Check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (role && accessToken) {
      // Check if the user has the required role
      if (to.meta.role === role) {
        next(); // Allow access
      } else {
        // Redirect to unauthorized page
        next('/');
      }
    } else {
      // Redirect to login page
      next('/');
    }
  } else {
    // Continue with the navigation for routes that don't require authentication
    next();
  }
});

export default router
