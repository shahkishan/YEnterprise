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
        dispatch
    },
    state:{
        count:0,
        isLoggedIn: false,
        isLoginPage:false
    },
    getters: {
        // isLoggedIn: state=> state.isLoggedIn,
        isLoginPage: state=> state.isLoginPage
    },
    mutations:{
        // LOGIN_SUCCESS:(state,payload)=>{
        //     state.isLoggedIn=!state.isLoggedIn;
        // },

        LOGIN_PAGE:(state,payload)=>{
            state.isLoginPage=payload;
        }
    },
    actions:{
        // loginSuccess: (context,payload)=>{
        //     context.commit("LOGIN_SUCCESS",payload)
        // }

        loginPage({commit,getters},payload){
            commit('LOGIN_PAGE',payload);
            // alert("here  ")
        }
    }
})