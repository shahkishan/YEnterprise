import Vue from 'vue'
import vuex from 'vuex'
import Customer from '../../models/BusinessAssociate'
import axios from 'axios'
import Constants from '../../Utility/constants'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='customers/'
const URL=BASE_URL+MODEL_URL
Vue.use(vuex)

export default{
    state:{
        customers:[]
    }, 
    getters:{
        getCustomers:state=>state.customers
    },
    mutations:{
        addNewCustomer:(state,payload)=>{
            state.customers.push(payload)
        },
        getCustomers:(state,payload)=>{
            state.customers=payload
        },
        updateCustomer:(state,payload)=>{
          var customer=state.customers.find(customer=>{
              return customer.ba_id===payload.ba_id
          })
          const index=state.customers.indexOf(customer)
          state.customers.splice(index,1,payload)
        },
        deleteCustomer:(state,payload)=>{
            const index=state.customers.indexOf(payload)
            state.customers.splice(index,1)
        }
    },
    actions:{
        addNewCustomer({commit,getters},payload){
            axios.post(URL,payload)
                .then(res=>{
                    console.log(res)
                    if(res.status==200)
                        commit('addNewCustomer',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        getCustomers({commit,getters}){
            axios.get(URL)
                .then(res=>{
                    console.log(res.data)
                    commit('getCustomers',res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        updateCustomer({commit,getters},payload){
            axios.put(URL+payload.ba_id,payload)
                .then(res=>{
                    if(res.status==200)
                        commit('updateCustomer',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        deleteCustomer({commit,getters},payload){
            axios.delete(URL+payload.ba_id)
                .then(res=>{
                    if(res.status==200)
                        commit('deleteCustomer',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
}