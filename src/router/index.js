import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Users from '@/components/Users'
import Transport from '@/components/Transport'
import Company from '@/components/Company'
import Customers from '@/components/Customers'
import Suppliers from '@/components/Suppliers'
import Purchase from '@/components/NewPurchase'
import Items from '@/components/Item'
import Rent from '@/components/Rent'
import MiscItems from '@/components/MiscItems'
Vue.use(Router)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path:'/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/dashboard',
      name:'Dashboard',
      component:Dashboard
    },
    {
      path:'/users',
      name:'Users',
      component:Users
    },
    {
      path:'/purchase',
      name:'Purchase',
      component: Purchase
		},
		{
			path:'/transport',
			name:'Transport',
			component:Transport
		},

		{
			path:'/company',
			name:'Company',
			component:Company
		},
		{
			path:'/customers',
			name:'Customers',
			component: Customers
		},
		{
			path:'/suppliers',
			name:'Suppliers',
			component: Suppliers
    },
    {
      path:'/items',
      name:'Items',
      component:Items
    },
    {
      path:'/rent',
      name:'Rent',
      component:Rent
    },
    {
      path:'/miscItems',
      name:'MiscItems',
      component:MiscItems
    }

  ],
  mode:'history'
})
	