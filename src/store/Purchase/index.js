import Vue from 'vue'
import vuex from 'vuex'
import TransactionDetailsModel from '../../models/PurchaseDetails'
import axios from 'axios'
import Constants from '../../Utility/constants'

const URL = Constants.BASE_URL+"purchase"

export default{
    state:{
        transactions:[],
        transaction:TransactionDetailsModel
    },
    mutations:{
        loadPurchases(state,payload){
            state.transactions=payload
        }
    },
    actions:{

        loadPurchases({commit,getters}){
            axios.get(URL)
                .then(res=>{
                    console.log(res.data)
                    commit('loadTransactions',res.data)
                })
                .catch(err=>{
                    console.log(err)
                })
        },

        addPurchase({commit,getters},payload){
            axios.post(URL,payload)
                .then(res=>{
                    console.log(payload)
                    this.$store.dispatch('loadPurchases')
                })
                .catch(err=>{
                    console.log(err)
                    console.log(payload)
                })
        }
    },
    getters:{
        getTransactions:state=>state.transactions,
        getCurrentTransaction: state=>state.transaction
    }
}