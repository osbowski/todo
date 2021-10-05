import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import UserAuth from '../components/UserAuth.vue'
import store from '../store/';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{ requiresAuth:true }
  },
  {
    path: '/auth',
    name: 'Auth',
    component:UserAuth,
    meta:{ requiresUnauth:true }
    // component: () => import(/* webpackChunkName: "about" */ '../components/UserAuth.vue')
  },
  {
    path:'/:notFound(.*)',
    redirect:'/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to,_,next)=>{  
 if(to.meta.requiresUnauth && store.getters.getAuthStatus){
    next('/')
  }else if(to.meta.requiresAuth && !store.getters.getAuthStatus){
    next('/auth')
  }
  
  else{
    next()
  }
})


export default router
