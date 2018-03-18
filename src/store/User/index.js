import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default{
    state:{
        isLoggedIn: false,
        email:'admin@admin.com',
        password:'admin123',
        year:''
    },
    getters: {
        isLoggedIn: state=> state.isLoggedIn,
        isLoginPage: state=> state.isLoginPage,
        email:state=>state.email,
        password:state=>state.password,
        year:state=>state.year
    },
    mutations:{
        LOGIN_SUCCESS:(state,payload)=>{
            state.isLoggedIn=payload;
        },
        UPDATE_YEAR:(state,year)=>{
            state.year=year;
        }

    },
    actions:{
        loginSuccess({commit,getters},payload,year){
            commit("LOGIN_SUCCESS",payload);
            commit('UPDATE_YEAR',year)
        },

        loginPage({commit,getters},payload){
            commit('LOGIN_PAGE',payload);
        }
    }
}