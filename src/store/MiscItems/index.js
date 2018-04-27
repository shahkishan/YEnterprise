import Vue from 'vue'
import vuex from 'vuex'
import MiscItems from '../../models/MiscItems'
import axios from 'axios'
import Constants from '../../Utility/constants'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='miscitems/'
const URL = BASE_URL+MODEL_URL
Vue.use(vuex)

export default{
    state:{
        miscitems:[]
    },
    getters:{
        getMiscItems:state=>state.miscitems
    },
    mutations:{
        addNewMiscItem:(state,payload)=>{
            state.miscitems.push(payload)
        },
        getMiscItems:(state,payload)=>{
            state.miscitems=payload
        },
        updateMiscItems:(state,payload)=>{
            var miscitem=state.miscitems.find(miscitem=>{
                return miscitem.misc_item_id==payload.misc_item_id
            })
        const index=state.miscitems.indexOf(miscitem)
        state.miscitems.splice(index,1,payload)
        },
        deleteMiscItems:(state,payload)=>{
            const index=state.miscitems.indexOf(payload)
            state.miscitems.splice(index,1)
        },
        actions:{
            addNewMiscItem({commit,getters},payload){
                axios.post(URL,payload)
                .then(res=>{
                    console.log(res)
                    if(res.status==200)
                    commit('addNewMiscItem',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            getMiscItems({commit,getters}){
                axios.get(URL)
                .then(res=>{
                    console.log(res.data)
                    commit('getMiscItems',res.data)
                })
                .catch(err=>{
                    console.log(err)

                })
            },
            updateMiscItems({commit,getters},payload){
                axios.put(URL+payload.misc_item_id,payload)
                .then(res=>{
                    if(res.status==200)
                    commit('updateMiscItems',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
            },
            deleteMiscItems({commit,getters},payload){
                axios.delete(URL+payload.misc_item_id)
                .then(res=>{
                    if(res.status==200)
                    commit('deleteMiscItems',payload)
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        }


    }

}