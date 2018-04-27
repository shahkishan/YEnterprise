import Vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'
import Constants from '../../Utility/constants'

const URL = Constants.BASE_URL+"site/"


export default{
    state:{
        sites:[]
    },
    getters:{
        getSites:state=>state.sites
    },
    mutations:{
        loadSites(state,payload){
            state.sites=payload
        }
    },
    actions:{
        addSite({commit,getters},payload){
            axios.post(URL,payload)
                .then(res=>{
                    if(res.status==200)
                        console.log("Success")
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        loadSites({commit,getters,dispatch},payload){
            axios.get(URL)
                .then(res=>{
                    if(res.status==200){
                        console.log(res.data)
                        commit('loadSites',res.data)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        },
    }
}