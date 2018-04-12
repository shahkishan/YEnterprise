import Vue from 'vue'
import Vuex from 'vuex'
import Compnay from '../../models/Company'
import axios from 'axios'
import Constants from '../../Utility/constants'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='companyDetails/'
const URL=BASE_URL+MODEL_URL
Vue.use(Vuex)

export default{
    state:{
        company:[]
    },
    getters:{
        getCompany:state=>state.company
    },
    mutations:{
        addNewCompany:(state,payload)=>{
            state.company.push(payload)
        },

        getCompany:(state,payload)=>{
            state.company=payload
        },
        updateCompany:(state,payload)=>{
            var company=state.company.find(company=>{
                return company.company_id==payload.company_id
            })
            const index=state.company.indexOf(payload)
            state.company.splice(index,1,payload)
        },
        deleteCompany:(state,payload)=>{
            const index=state.company.indexOf(payload)
            state.company.splice(index,1)
        }
    },
    actions:{
        addNewCompany({commit,getters},payload){
            axios.post(URL,paylod)
            .then(res=>{
                console.log(res)
                if(res.status==200)
                commit('addNewCompany',payload)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        getCompany({commit,getters})
        {
            
            axios.get(URL)
            .then(res=>{
                console.log(res.data)
                commit('getCompany',res.data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        updateCompany({commit,getters},payload){
            axios.put(URL+payload.company_id,payload)
            then(res=>{
                if(res.status==200)
                commit('updateCompany',payload)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        deleteCompany({commit,getters},payload){
            axios.delete(URL+payload.company_id)
            .then(res=>{
                if(res.status==200)
                  commit('deleteCompany',payload)
            })
            .catch(err=>{
                console.log(err)
            })
        }
    }

    
}

