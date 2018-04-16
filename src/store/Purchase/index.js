import Vue from 'vue'
import vuex from 'vuex'
import PurchaseDetailsModel from '../../models/PurchaseDetails'
import axios from 'axios'
import Constants from '../../Utility/constants'

const URL = Constants.BASE_URL+"purchase/"

export default{
    state:{
        purchases:[],
        purchase:PurchaseDetailsModel
    },
    mutations:{
        loadPurchases(state,payload){
            // state.purchases=payload
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
                
                if(prevId!=element.purchase_master_id){
                    var purchase_master={
                        purchase_master_id:element.purchase_master_id,
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
                        items:[]    
                    }
                    state.purchases.push(purchase_master)
                    prevId=element.purchase_master_id
                    cnt++
                    console.log(purchase_master.ba_id)
                }
                state.purchases[cnt].items.push(item)
                // console.log(JSON.stringify(state.purchases[cnt].items))
            });

        },
        deletePurchase(state,payload){
            var purchase=state.purchases.find(purchase=>{
                return payload===purchase.purchase_master_id
            })

            var index=state.purchases.indexOf(purchase)
            state.purchases.splice(index,1)
        },
        setUpdateItem(state,payload){
            state.purchase=payload
        }
    },
    actions:{

        loadPurchases({commit,getters,dispatch}){
            axios.get(URL)
                .then(res=>{
                    console.log(res.data)
                    commit('loadPurchases',res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
        },

        addPurchase({commit,getters,dispatch},payload){
            axios.post(URL,payload)
                .then(res=>{
                    console.log(payload)
                    dispatch('loadPurchases')
                })
                .catch(err=>{
                    console.log(err)
                    console.log(payload)
                })
        },

        deletePurchase({commit,getters,dispatch},id){
            var x=this
            axios.delete(URL+id)
                .then(res=>{
                    if(res.status==200){
                        commit('deletePurchase',id)
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        },
        setUpdateItem({commit,getters},payload){
            commit('setUpdateItem',payload)
        },
        updatePurchase({commit,getters},payload){
            axios.put(URL+payload.purchase_master_id,payload)
                .then(res=>{
                    if(res.status==200)
                        console.log('success')
                })
                .catch(err=>{
                    console.log(err)
                })
            }
    },
    getters:{
        getPurchases:state=>state.purchases,
        getCurrentPurchase: state=>state.purchase
    }
}