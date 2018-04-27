import Vue from 'vue'
import Vuex from 'vuex'
import Rent from '../../models/RentDetails'
import axios from 'axios'
import Constants from '../../Utility/constants'
const BASE_URL=Constants.BASE_URL
const MODEL_URL='rentDetails/'
const URL=BASE_URL+MODEL_URL
Vue.use(Vuex)

export default{
    state:{
        rents:[]
    },
    getters:{
        getRentDetails:state=>state.rents
    },
    mutations:{
        LoadAllRents(state,payload){
             // state.rents=payload
             let prevId=0
             let cnt=-1
             console.log(payload)
             payload.forEach(element => {
                 var item={
                     item_detail_id:element.item_detail_id,
                     item_detail_name:element.item_detail_name,
                     item_master_id:element.item_master_id,
                     item_master_name:element.item_master_name,
                     hsn_code:element.hsn_code,
                     quantity:element.quantity,
                     rate:element.rate,
                     total: element.rate * element.quantity
                 }
                 
                 if(prevId!=element.rent_master_id){
                     var rent_master={
                         rent_master_id:element.rent_master_id,
                         date:element.date,
                         invoice_no: element.invoice_no,
                         ba_id:element.ba_id,
                         ba_name: element.ba_name,
                         company_id:element.company_id,
                         company_name:element.company_name,
                         amount:element.amount,
                         taxes:element.taxes,
                         loading_charges:element.loading_charges,
                         unloading_charges:element.unloading_charges,
                         transport_charges:element.transport_charges,
                         is_credit:element.is_credit,
                         status: element.status,
                         items:[]    
                     }
                     state.rents.push(rent_master)
                     prevId=element.rent_master_id
                     cnt++
                     console.log(rent_master.ba_id)
                 }
                 state.rents[cnt].items.push(item)
                 // console.log(JSON.stringify(state.rents[cnt].items))
             });
 
        }
    },
    actions:{
        LoadAllRents({commit,getters,dispatch}){
            axios.get(URL)
                .then(res=>{
                    if(res.status==200){
                        commit('LoadAllRents',res.data)
                        console.log(res.data)
                    }
                })
        },
        AddNewRent({commit,getters,dispatch},payload){
            axios.post(URL,payload)
                .then(res=>{
                    if(res.status==200){
                        console.log("rent success")
                        dispatch('LoadAllRents')
                    }
                })
        }
    }
}