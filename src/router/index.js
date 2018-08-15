import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/General/Main'
import Login from '@/components/User/Login'
import Dashboard from '@/components/General/Dashboard'
import Users from '@/components/User/Users'
import Transport from '@/components/BusinessAssociates/Transport'
import Company from '@/components/Company/Company'
import Customers from '@/components/BusinessAssociates/Customers'
import Suppliers from '@/components/BusinessAssociates/Suppliers'
import AddPurchase from '@/components/Products/Purchase/NewPurchase'
import Purchase from '@/components/Products/Purchase/Purchase'
import Items from '@/components/Products/Item'
import Rent from '@/components/Products/Rent/Rent'
import MiscItems from '@/components/General/MiscItems'
import UpdatePurchase from '@/components/Products/Purchase/UpdatePurchase'
import AddRent from '@/components/Products/Rent/AddRent'
import UpdateRent from '@/components/Products/Rent/UpdateRent'

import PurchaseNew from '@/components/Products/Purchase/PurchaseNew'
import RentNew from '@/components/Products/Rent/RentNew'
import Invoice from '@/components/Products/Rent/Invoice'

import RentDetails from '@/components/BusinessAssociates/RentDetails/RentDetails'
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
    },
    {
      path:'/purchase/add',
      name:'Add Purchase',
      component:AddPurchase
    },
    {
      path:'/purchase/update',
      name:'Update Purchase',
      component: UpdatePurchase
    },
    {
      path:'/rent/add',
      name:'Add Rent',
      component: AddRent
    },
    {
      path:'/rent/:id/update',
      name:'Update Rent',
      component:UpdateRent,
      props:true
    },


    {
      path:'/purchasenew',
      name:'New Purchase',
      component: PurchaseNew
    },
    {
      path:'/rentnew',
      name:'New Rent',
      component: RentNew
    },
    {
      path:'/invoice',
      name:'Invoice',
      component:Invoice
    },
    {
      path:'/customer/muster',
      name:"Muster",
      component:RentDetails
    }


  ],
  mode:'history'
})
	