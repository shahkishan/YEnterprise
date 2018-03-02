import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        count:0,
        isLoggedIn: false
    }, 
    getters: {
        isLoggedIn: state=> state.isLoggedIn
        
    }, 
    mutations:{
        LOGIN_SUCCESS:(state,payload)=>{
            state.isLoggedIn=!state.isLoggedIn;
        }
    } 
    // actions:{
    //     loginSuccess: (context,payload)=>{
    //         context.commit("LOGIN_SUCCESS",payload)
    //     }
    // }
})
