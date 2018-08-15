import Vue from 'vue'
import Vuex from 'vuex'
import user from './User/index'
import supplier from './Supplier/index'
import customer from './Customer/index'
import items from './Item/index'
import purchase from './Purchase/index'
import company from './Company'
import rent from './Rent/index'
import sites from './Site/index'
import shared from './Shared'
import dispatch from './Dispatch'
import rentReturn from './Rent/return'
Vue.use(Vuex)

export const store = new Vuex.Store({
    modules:{
        user: user,
        supplier,
        customer,
        items,
        purchase,
        company,
        rent,
        sites,
        shared,
        dispatch,
        rentReturn
    },
    state:{
        snackbar:{
            flag:false,
            message: ''
        }
    },
    getters: {
        getSnackbar:state=>state.snackbar

    },
    mutations:{
        Snackbar(state,payload){
            state.snackbar=payload

        }
    },
    actions:{
       SnackbarToggle:({commit},payload)=>{
           commit('Snackbar',payload)
       }
    }
})