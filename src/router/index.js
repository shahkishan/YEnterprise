import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Users from '@/components/Users'
import Suppliers from '@/components/Suppliers'
import Customers from '@/components/Customers'
Vue.use(Router)


export default new Router({
	routes: [
		{
			path: '/',
			name: 'Main',
			component: Main
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/dashboard',
			name: 'Dashboard',
			component: Dashboard
		},
		{
			path: '/users',
			name: 'Users',
			component: Users
		},
		{
			path: '/suppliers',
			name: 'Suppliers',
			component: Suppliers
		},
		{
			path:'/customers',
			name: 'Customers',
			component: Customers
		}
	]
})
