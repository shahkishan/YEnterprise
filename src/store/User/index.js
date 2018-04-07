import Vue from 'vue'
import Vuex from 'vuex'
import User from '../../models/User'
import axios from 'axios'
import Constants from '../../Utility/constants'
Vue.use(Vuex)

export default{
    state:{
        isLoggedIn: false,
        User,
        user:User,
        users:[],
        year:''
    },
    getters: {
        isLoggedIn: state=> state.isLoggedIn,
        email:state=>state.email,
        password:state=>state.password,
        year:state=>state.year,
        user:state=>state.User,
        users:state=>state.users
    },
    mutations:{
        LOGIN_SUCCESS:(state,payload)=>{
            state.isLoggedIn=payload;
        },
        UPDATE_YEAR:(state,year)=>{
            state.year=year;
        },
        getUsers:(state,payload)=>{
            state.users=payload
        },
        addUser:(state,user)=>{
            state.users.push(user)
        },
        updateUser:(state,user)=>{
            var index=state.users.indexOf(user)
            Object.assign(state.users[index],user)
        },
        deleteUser:(state,user)=>{
            var index=state.users.indexOf(user)
            state.users.splice(index,1)
        }

    },
    actions:{
        loginSuccess({commit,getters},payload,year){
            commit("LOGIN_SUCCESS",payload);
            commit('UPDATE_YEAR',year)
        },

        loginPage({commit,getters},payload){
            commit('LOGIN_PAGE',payload);
        },
        getUsers({commit,getters}){
            axios.get(Constants.BASE_URL+"users")
                .then(res=>{
                    console.log(JSON.parse(JSON.stringify(res)).data)
                    if(res.status==200){
                        commit('getUsers',JSON.parse(JSON.stringify(res)).data)
                    }
                }).catch(err=>{
                    console.log(err)
                })    
        },
        addUser({commit,getters},user){
            axios.post(Constants.BASE_URL+"users",{
                user
            }).then(res=>{
                console.log(res.status)
                if(res.status==200){
                    commit('addUser',user)
                }
            }).catch(err=>{
               console.log(err) 
            })
           
        },
        editUser({commit,getters},user){

            axios.put(Constants.BASE_URL+"users/"+user.user_id,{
                user
            }).then(res=>{
                console.log(res)
                if(res.status==200){
                    commit('updateUser',user)
                }
            }).catch(err=>{
               console.log(err) 
            })
            if(flag){
                commit('editUser',user,index)
            }

        },
        deleteUser({commit,getters},user){
            axios.delete(Constants.BASE_URL+"users/"+user.user_id)
                .then(res=>{
                    console.log(res)
                    if(res.status==200){
                        commit('deleteUser',user)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
}