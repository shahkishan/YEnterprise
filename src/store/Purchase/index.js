import Vue from 'vue'
import vuex from 'vuex'
import PurchaseDetails from '../../models/PurchaseDetails'
import firebase from 'firebase'
import 'firebase/firestore'
export default{
    state:{
        purchases:[],
        purchase:PurchaseDetails
    },
    mutations:{
        loadPurchases(state,payload){
            state.purchases=payload
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

        loadAllPurchases({commit,getters,dispatch}){
                firebase.firestore().collection('purchases').orderBy('date').onSnapshot(snapshot=>{
                    var purchases=[]
                    snapshot.forEach(doc=>{
                        var purchase=Object.assign({},PurchaseDetails)
                        purchase=doc.data()
                        purchase.purchase_id=doc.id
                        purchases.push(purchase)
                    })
                    commit('loadPurchases',purchases)
                })
        },
        loadFilteredPurchases({commit},payload){
            firebase.firestore().collection('purchases').where('company_id',"==",payload).orderBy('date').onSnapshot(snapshot=>{
                var purchases=[]
                snapshot.forEach(doc=>{
                    var purchase=Object.assign({},PurchaseDetails)
                    purchase=doc.data()
                    purchase.purchase_id=doc.id
                    purchases.push(purchase)
                })
                commit('loadPurchases',purchases)
            })
        },

        addPurchase({commit,getters,dispatch},payload){
            delete payload.purchase_id

            payload.items.forEach(item=>{
                firebase.firestore().collection('items').doc(item.item_id).collection('subitems').where('subitem_id','==',item.subitem_id).get(snapshot=>{
                    var subitem=snapshot.data()
                    subitem.quantity+=item.quantity
                    firebase.firestore().collection('items').doc(item.item_id).collection('subitems').doc(item.subitem_id).update(subitem)
                        .then(()=>{
                            console.log('qty')
                        })
                        .catch(err=>{
                            console.error(err)
                        })
                })
            })

            firebase.firestore().collection('purchases').add(payload)
                .then(docRef=>{
                    console.log(docRef.id)
                    
                    

                    return true
                })
                .catch(err=>{
                    console.error(err)
                    return false
                })
        },

        deletePurchase({commit,getters,dispatch},id){
            firebase.firestore().collection('purchases').doc(id).delete()
                .then(()=>{
                    console.log("deleted")
                    return true
                })
                .catch(err=>{
                    console.error(err)
                    return false
                })
        },
        setUpdateItem({commit,getters},payload){
            commit('setUpdateItem',payload)
        },
        updatePurchase({commit,getters},payload){
            var id=payload.purchase_id
            delete payload.purchase_id

            firebase.firestore().collection('purchases').doc(id).update(payload)
                .then(()=>{
                    console.log("updated")
                    return true
                })
                .catch(err=>{
                    console.error(err)
                    return false
                })
        }
    },
    getters:{
        getPurchases:state=>state.purchases,
        getCurrentPurchase: state=>state.purchase
    }
}