import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import HelloWorld from '@/components/HelloWorld'
import NewUser from '@/components/NewUser'
import EditUser from '@/components/EditUser'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/data',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/add',
      name: 'NewUser',
      component: NewUser
    },
    {
        path: '/edit/:user',
        name: 'EditUser',
        component: EditUser
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
