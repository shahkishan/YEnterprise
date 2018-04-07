import Vue from 'vue'
import vuex from 'vuex'
import Supplier from '../../models/BusinessAssociate'
import axios from 'axios'
import Constants from '../../Utility/constants'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='suppliers/'
const URL=BASE_URL+MODEL_URL
Vue.use(vuex)

export default{
    state:{
        suppliers:[]
    }, 
    getters:{
        getSuppliers:state=>state.suppliers
    },
    mutations:{
        addNewSupplier:(state,payload)=>{
            state.suppliers.push(payload)
        },
        getSuppliers:(state,payload)=>{
            state.suppliers=payload
        },
        updateSupplier:(state,payload)=>{
          var supplier=state.suppliers.find(supplier=>{
              return supplier.ba_id===payload.ba_id
          })
          const index=state.suppliers.indexOf(supplier)
          state.suppliers.splice(index,1,payload)
        },
        deleteSupplier:(state,payload)=>{
            const index=state.suppliers.indexOf(payload)
            state.suppliers.splice(index,1)
        }
    },
    actions:{
        addNewSupplier({commit,getters},payload){
            axios.post(URL,payload)
                .then(res=>{
                    console.log(res)
                    if(res.status==200)
                        commit('addNewSupplier',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        getSuppliers({commit,getters}){
            axios.get(URL)
                .then(res=>{
                    console.log(res.data)
                    commit('getSuppliers',res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        updateSupplier({commit,getters},payload){
            axios.put(URL+payload.ba_id,payload)
                .then(res=>{
                    if(res.status==200)
                        commit('updateSupplier',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        deleteSupplier({commit,getters},payload){
            axios.delete(URL+payload.ba_id)
                .then(res=>{
                    if(res.status==200)
                        commit('deleteSupplier',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }
}